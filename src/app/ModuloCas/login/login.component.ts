import { Component, OnInit } from '@angular/core';
import {CasClient } from "../../casClient/CasClient"
import {SesionUsuario} from '../../casClient/SesionUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private casclient:CasClient, private session: SesionUsuario, private router: Router) { }

  async ngOnInit() {
    if (!this.casclient.getLogin()) {
      console.log('Estoy sin Login');
      this.casclient.saveTicket();
      await this.casclient.verificaLogin().then();
      await this.router.navigate(['/error']);
    }
    if (this.casclient.isAuthenticated() && this.casclient.getLogin()) {
      await this.session.InicioSesion();
    }
}
}

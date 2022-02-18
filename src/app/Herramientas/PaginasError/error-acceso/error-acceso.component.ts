import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-acceso',
  templateUrl: './error-acceso.component.html',
  styleUrls: ['./error-acceso.component.scss']
})
export class ErrorAccesoComponent implements OnInit {

  correo=sessionStorage.getItem('loginUser');
  constructor() { }

  ngOnInit(): void {
  }

}

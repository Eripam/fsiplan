import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  showMenu!: boolean;

  constructor() {}

  ngOnInit(): void {}

  onChangeMenuHeader(variable: boolean) {
    this.showMenu = variable;
    console.log('menu padre', this.showMenu);
  }

  onShowMenu(variable: boolean) {
    this.showMenu = variable;
  }
}

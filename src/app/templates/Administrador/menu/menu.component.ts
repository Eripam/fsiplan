import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  items = [
    {
      name: 'Front-end',
      iconClass: 'home',
      active: true,
      submenu: [
        { name: 'HTML', url: '/usuarios' },
        { name: 'CSS', url: '#' },
        { name: 'Javascript', url: '#' },
      ],
    },
    {
      name: 'Responsive web',
      iconClass: 'keyboard',
      active: false,
      submenu: [
        { name: 'Tablets', url: '#' },
        { name: 'Mobiles', url: '#' },
        { name: 'Desktop', url: '#' },
      ],
    },
    {
      name: 'Web Browser',
      iconClass: 'edit',
      active: false,
      submenu: [
        { name: 'Chrome', url: '#' },
        { name: 'Firefox', url: '#' },
        { name: 'Desktop', url: '#' },
      ],
    },
  ];
  expandedIndex = 0;
  constructor() {}
}

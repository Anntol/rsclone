import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IMatMenuListItem } from '../../models/menu.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  // idea from https://www.angularjswiki.com/material/menu/#navigate-to-an-angular-route-on-menu-click-event
  menuListItems : IMatMenuListItem[] = [
    {
      menuLinkText: 'Home',
      menuIcon: 'home',
      routerLink: '/home'
    },
    {
      menuLinkText: 'Log In',
      menuIcon: 'login',
      routerLink: '/login'
    },
    {
      menuLinkText: 'Sign Up',
      menuIcon: 'person_add',
      routerLink: '/signup'
    },
    {
      menuLinkText: 'Log Out',
      menuIcon: 'logout',
      routerLink: '/'
    }
  ];

  constructor(private router: Router) { };

  clickMenuItem(item: IMatMenuListItem): void {
    this.router.navigate([item.routerLink])
    .catch((err: Error) => console.error(err.message));
  }
 }

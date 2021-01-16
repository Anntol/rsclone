import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/auth.service'
import { IMatMenuListItem } from '../../models/menu.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  // idea from https://www.angularjswiki.com/material/menu/#navigate-to-an-angular-route-on-menu-click-event
  menuListItems : IMatMenuListItem[] = [
    {
      menuLinkText: 'Home',
      menuIcon: 'home',
      routerLink: '/home',
      isVisible: true
    },
    {
      menuLinkText: 'Log In',
      menuIcon: 'login',
      routerLink: '/login',
      isVisible: !this.isUserAuthenticated
    },
    {
      menuLinkText: 'Sign Up',
      menuIcon: 'person_add',
      routerLink: '/signup',
      isVisible: !this.isUserAuthenticated
    },
    {
      menuLinkText: 'Log Out',
      menuIcon: 'logout',
      routerLink: '/',
      isVisible: this.isUserAuthenticated
    }
  ];

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.authStatusSubscriber = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  clickMenuItem(item: IMatMenuListItem): void {
    this.router.navigate([item.routerLink])
    .catch((err: Error) => console.error(err.message));
  }
 }

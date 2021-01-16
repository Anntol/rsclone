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

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
      console.log('authStatusSubscriber: ', isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
 }

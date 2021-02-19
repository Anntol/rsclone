import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss', '../../../../theme/stacks.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}

import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    './user-profile-adaptive.scss'
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  constructor(private settingsService: SettingsService, private authService: AuthService) {}

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
}

import {
  AfterViewInit,
 Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IUserInfo } from '../../../core/models/userinfo.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', './user-profile-adaptive.scss', '../../../../theme/noselect.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(UserInfoComponent)
  child!: UserInfoComponent;

  location!: string;

  model: IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  constructor(private settingsService: SettingsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
    // this.model = this.child.model;
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.model = this.child.model }, 1000)
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }
}

import {
ViewChild, Component, OnDestroy, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { UserInfoComponent } from '../user-info/user-info.component';
// import { IUserInfo } from '../../../core/models/userinfo.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    './user-profile-adaptive.scss',
    '../../../../theme/noselect.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileComponent implements OnInit, OnDestroy {
//  @ViewChild(UserInfoComponent) userInfo!: UserInfoComponent;

  // model: IUserInfo = {
  //   firstName: '',
  //   lastName: '',
  //   city: '',
  //   country: '',
  //   phone: '',
  //   email: ''
  // };

  isUserAuthenticated = false;

  @Input() userName = 'User';

  private authStatusSubscriber!: Subscription;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  public userNameHandler(userName: string): void {
    this.userName = userName;
    this.cdr.detectChanges();
  }

  // ngAfterViewChecked(): void {
  //   if (this.isUserAuthenticated) this.userName = this.userInfo.model.firstName;
  //   this.cdr.detectChanges();
  // }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }
}

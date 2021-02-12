import {
Component, OnDestroy, OnInit, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { IFavourite } from '../../../core/models/favourite.model';
import { IUserInfo } from '../../../core/models/userinfo.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    './user-profile-adaptive.scss',
    '../../../../theme/noselect.scss'
  ],
})

export class UserProfileComponent implements OnInit, OnDestroy {
  modelUser: IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  userFavourites!: IFavourite[];

  countFavourites = 0;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated
    });
    this.getFavs();
    this.getUserInfo();
  }

  public getFavs(): void {
    if (this.isUserAuthenticated) {
      const favsObservable = this.settingsService.getUserFavourites();
      favsObservable.subscribe((data) => {
        this.userFavourites = data.favourites;
        this.countFavourites = this.userFavourites.length;
      });
    } else {
      this.countFavourites = 0;
    }
  }

  public getUserInfo(): void {
    if (this.isUserAuthenticated) {
      const userObservable = this.settingsService.getUserInfoSettings();
      userObservable.subscribe((data) => {
        this.modelUser = data.userInfo;
      });
    }
  }

  public userDataHandler(userData: IUserInfo): void {
    this.modelUser = userData;
    this.settingsService.SaveUserInfo(this.modelUser);
    this.cdr.detectChanges();
  }

  public favouriteDeleteHandler(projectId: number): void {
    this.settingsService.removeUserFavourite(projectId.toString()).subscribe((data) => {
      this.userFavourites = data.favourites;
      this.getFavs();
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }
}

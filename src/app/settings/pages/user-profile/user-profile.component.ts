import {
Component, OnDestroy, OnInit, ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../servise/settings.service';
import { IFavourite } from '../../models/favourite.model';
import { IUserInfo } from '../../models/userinfo.model';
import { ModeService } from '../../../core/service/mode.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    './user-profile-adaptive.scss',
    '../../../../theme/noselect.scss'
  ],
})

export class UserProfileComponent implements OnInit, OnDestroy, AfterViewChecked {
  modelUser: IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  isUserAuthenticated = false;

  isDarkMode!: boolean;

  private authStatusSubscriber!: Subscription;

  userFavourites!: IFavourite[];

  countFavourites = 0;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef,
    private modeService: ModeService
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated
    });

    this.getFavs();
    this.getUserInfo();
  }

  ngAfterViewChecked(): void {
    this.isDarkMode = this.modeService.getActiveMode().name === "dark";
    this.cdr.detectChanges();
  }

  getFavs(): void {
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

  getUserInfo(): void {
    if (this.isUserAuthenticated) {
      const userObservable = this.settingsService.getUserInfoSettings();
      userObservable.subscribe((data) => {
        this.modelUser = data.userInfo;
      });
    }
  }

  userDataHandler(userData: IUserInfo): void {
    this.modelUser = userData;
    this.settingsService.SaveUserInfo(this.modelUser);
    this.cdr.detectChanges();
  }

  favouriteDeleteHandler(projectId: number): void {
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

import {
  AfterViewChecked, ViewChild, Component, OnDestroy, OnInit, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IUserInfo } from '../../../core/models/userinfo.model';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', './user-profile-adaptive.scss', '../../../../theme/noselect.scss']
})

export class UserProfileComponent implements OnInit, OnDestroy, AfterViewChecked {
 @ViewChild(UserInfoComponent) userInfo!: UserInfoComponent;

 @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  model: IUserInfo = {
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

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
    if (this.isUserAuthenticated) this.model = this.userInfo.model;

    const dataMode = localStorage.getItem('rs_userMode');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dataMode !== null) this.isDarkMode = JSON.parse(dataMode).name === "dark";
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }
}

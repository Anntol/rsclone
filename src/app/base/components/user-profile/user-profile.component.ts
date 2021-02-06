import {
  AfterViewChecked, ViewChild, Component, OnDestroy, OnInit, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    './user-profile-adaptive.scss'
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy, AfterViewChecked {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }
}

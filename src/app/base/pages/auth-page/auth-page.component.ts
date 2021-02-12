import {
 Component, OnInit, ViewChild , ChangeDetectorRef, OnDestroy, AfterViewChecked
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

import { AuthData } from '../../../core/models/authdata.model';
import { AuthService } from '../../../core/service/auth.service';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: [
    './auth-page.component.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/noselect.scss'
  ]
})
export class AuthPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  subscription!: SubscriptionLike;

  authType = '';

  returnUrl = '/';

  isDarkMode!: boolean;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
) {}

  ngAfterViewChecked(): void {
    const dataMode = localStorage.getItem('rs_userMode');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dataMode !== null) this.isDarkMode = JSON.parse(dataMode).name === "dark";
  }

  ngOnInit(): void {
    this.subscription = this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'signup')
      this.authType = data[data.length - 1].path;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value as AuthData;
    if (this.authType === 'login') {
      this.authService.loginUser(email, password, this.returnUrl);
    } else {
      this.authService.createUser(email, password, this.returnUrl);
    }
  }

   ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

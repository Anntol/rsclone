import {
 Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewChecked
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthData } from '../../models/authdata.model';
import { AuthService } from '../../services/auth.service';
import { ModeService } from '../../../core/service/mode.service';

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
  subscription!: SubscriptionLike;
  authType = '';
  returnUrl = '/';
  isDarkMode!: boolean;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modeService: ModeService
) {
  this.subscription = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  )
    .subscribe((event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.authType = (event.url as string).slice(1);
    });
}

  ngAfterViewChecked(): void {
    this.isDarkMode = this.modeService.getActiveMode().name === "dark";
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.subscription = this.route.url.subscribe((data) => {
    // Get the last piece of the URL (it's either 'login' or 'signup')
    // this.authType = data[data.length - 1].path;

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

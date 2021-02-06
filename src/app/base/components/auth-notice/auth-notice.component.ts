import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-notice',
  templateUrl: './auth-notice.component.html',
  styleUrls: ['./auth-notice.component.scss']
})
export class AuthNoticeComponent {
  constructor(private router: Router) { }

  goToLoginPage(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
  }
}

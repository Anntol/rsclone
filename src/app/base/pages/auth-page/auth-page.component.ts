import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthData } from '../../../core/models/authdata.model';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  title = '';

  authType = '';

  constructor(public authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'signup')
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Log In' : 'Sign Up';
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(this.authType);
    const { email, password } = form.value as AuthData;
    if (this.authType === 'login') {
      this.authService.loginUser(email, password);
    } else {
      this.authService.createUser(email, password);
    }
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm): void {
    // eslint-disable-next-line no-console
    console.log('form ', form.value);
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value as AuthData;
    this.authService.createUser(email, password);
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value as AuthData;
    this.authService.loginUser(email, password);
  }
}

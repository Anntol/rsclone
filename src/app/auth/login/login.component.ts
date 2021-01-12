import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onLogin(form: NgForm): void {
    // eslint-disable-next-line no-console
    console.log(form.value);
  }
}

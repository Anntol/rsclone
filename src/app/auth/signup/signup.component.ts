import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  onSignup(form: NgForm): void {
    // eslint-disable-next-line no-console
    console.log(form.value);
  }
}

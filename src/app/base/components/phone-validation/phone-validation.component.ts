import { Component } from '@angular/core';
import {
 FormGroup, FormBuilder, Validators, AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.scss', '../../../../theme/buttons.scss']
})
export class PhoneValidationComponent {
  phoneForm: FormGroup;

  phoneNumber!: number;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: [undefined, [Validators.required]],
    });
  }

  get phoneValue(): AbstractControl {
    return this.phoneForm.controls.phone;
  }
}

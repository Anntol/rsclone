import {
 Component, OnInit, ViewChild , ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthData } from '../../../core/models/authdata.model';
import { AuthService } from '../../../core/service/auth.service';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss', '../../../../theme/buttons.scss']
})
export class AuthPageComponent implements OnInit {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  authType = '';

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'signup')
      // this.authType = data[data.length - 1].path;
    });
    this.route.params.subscribe((params): void => {
      console.log(params);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.authType = params.page;
     });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value as AuthData;
    if (this.authType === 'login') {
      this.authService.loginUser(email, password);
    } else {
      this.authService.createUser(email, password);
    }
  }
}

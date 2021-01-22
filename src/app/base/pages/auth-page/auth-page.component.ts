import {
 Component, OnInit, ViewChild , ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { AuthData } from '../../../core/models/authdata.model';
import { AuthService } from '../../../core/service/auth.service';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss', '../../../../theme/buttons.scss']
})
export class AuthPageComponent implements AfterViewChecked, OnInit {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  authType = '';

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'signup')
      this.authType = data[data.length - 1].path;
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

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rsclone';

  constructor(public translate: TranslateService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}

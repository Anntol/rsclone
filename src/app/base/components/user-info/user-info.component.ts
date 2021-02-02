import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '../../../core/models/userinfo.model';
import { SettingsService } from '../../../core/service/settings.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  model:IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  }

  constructor (private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  onSubmit(): void {
    console.log(this.model);
    this.settingsService.SaveUserInfo(this.model);
  }

  getUserInfo(): void {
    const infoObservable = this.settingsService.getUserInfoSettings();
    infoObservable.subscribe((data) => {
      this.model = data.userInfo;
      console.log(this.model);
    });
  }
}

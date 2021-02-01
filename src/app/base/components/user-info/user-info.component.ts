import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '../../../core/models/userinfo.model';
import { SettingsService } from '../../../core/service/settings.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  model!:IUserInfo;

  constructor (private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.model = {
      firstName: 'First',
      lastName: 'Last',
      city: 'Kyiv',
      country: 'Ukraine',
      phone: '+38(050)9876543'
    }
  }

  onSubmit(): void {
    console.log(this.model);
    this.settingsService.SaveUserInfo(this.model);
  }
}

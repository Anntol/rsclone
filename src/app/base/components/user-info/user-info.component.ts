import {
Component, EventEmitter, OnInit, ViewChild, Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserInfo } from '../../../core/models/userinfo.model';
import { SettingsService } from '../../../core/service/settings.service';
import { SelectCountryComponent } from '../../../shared/components/select-country/select-country.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss', '../../../../theme/buttons.scss']
})
export class UserInfoComponent implements OnInit {
  @ViewChild(SelectCountryComponent) countryCode!: SelectCountryComponent;

  model: IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  @Output() userName: EventEmitter<string> = new EventEmitter<string>();

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.model.country = this.countryCode.iso3166CountryCode;
    this.userName.emit(this.model.firstName);
    this.settingsService.SaveUserInfo(this.model);
  }

  getUserInfo(): void {
    const infoObservable = this.settingsService.getUserInfoSettings();
    infoObservable.subscribe((data) => {
      this.model = data.userInfo;
      this.countryCode.iso3166CountryCode = this.model.country;
    });
  }
}

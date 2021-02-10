import {
 AfterViewChecked, Component, OnInit, ViewChild
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
export class UserInfoComponent implements OnInit, AfterViewChecked {
  @ViewChild(SelectCountryComponent) country!: SelectCountryComponent;

  model: IUserInfo = {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  constructor(private settingsService: SettingsService) {}

  ngAfterViewChecked(): void {
    this.model.country = this.country.selectedCountry;
    // console.log(this.model.country);
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.settingsService.SaveUserInfo(this.model);
  }

  getUserInfo(): void {
    const infoObservable = this.settingsService.getUserInfoSettings();
    infoObservable.subscribe((data) => {
      this.model = data.userInfo;
      // this.model.country = this.country.selectedCountry;
    });
  }
}

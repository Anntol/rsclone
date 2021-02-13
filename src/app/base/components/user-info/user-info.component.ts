import {
Component, EventEmitter, ViewChild, Output, Input, SimpleChanges, OnChanges
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserInfo } from '../../../core/models/userinfo.model';
import { SelectCountryComponent } from '../../../shared/components/select-country/select-country.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss', '../../../../theme/buttons.scss']
})
export class UserInfoComponent implements OnChanges {
  @ViewChild(SelectCountryComponent) countryCode!: SelectCountryComponent;

  @Input() modelUser!: IUserInfo;

  @Output() userData: EventEmitter<IUserInfo> = new EventEmitter<IUserInfo>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.countryCode && changes.modelUser) {
      this.countryCode.iso3166CountryCode = this.modelUser.country;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.modelUser.country = this.countryCode.iso3166CountryCode;
    this.userData.emit(this.modelUser);
  }
}

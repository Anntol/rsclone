import { Component } from '@angular/core';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { IUserToken } from '../../../core/models/users.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  token!: IUserToken;

  constructor(private globalGivingApiService: GlobalGivingApiService) {}
}

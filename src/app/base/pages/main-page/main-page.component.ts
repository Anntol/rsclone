import { Component, OnInit } from '@angular/core';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { IUserToken } from '../../../core/models/users.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  token!: IUserToken;

  country = 'UA';

  constructor(private globalGivingApiService: GlobalGivingApiService) {}

  ngOnInit(): void {
    this.globalGivingApiService.getAccessToken().subscribe((data) => {
      console.log(this.token);
      this.token = data;
    });
    this.globalGivingApiService.getActiveProjectsForCountry(this.country).subscribe((data) => {
      console.log(data);
    });
  }
}

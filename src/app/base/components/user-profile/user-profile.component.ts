import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IFavourite } from '../../../core/models/favourite.model';
import { SettingsService } from '../../../core/service/settings.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  constructor(private settingsService: SettingsService) {}

  userFavourites!: IFavourite[]

  ngOnInit(): void {
    this.getFavs();
  }

  ngAfterViewInit(): void {
    this.getFavs();
  }

  getFavs(): void {
    const favsObservable = this.settingsService.getUserFavourites();
    favsObservable.subscribe((data) => {
      console.log('data:', data);
      this.userFavourites = data.favourites;
      console.log(this.userFavourites);
    });
    console.log(this.userFavourites);
  }
  /* email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  } */
}

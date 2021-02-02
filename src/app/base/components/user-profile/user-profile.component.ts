import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { IFavourite } from '../../../core/models/favourite.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  constructor(private settingsService: SettingsService, private authService: AuthService) {}

  userFavourites!: IFavourite[]

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
    this.getFavs();
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  getFavs(): void {
    if (this.isUserAuthenticated) {
      const favsObservable = this.settingsService.getUserFavourites();
      favsObservable.subscribe((data) => {
        this.userFavourites = data.favourites;
        console.log(this.userFavourites);
      });
    }
  }
  /* email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  } */
}

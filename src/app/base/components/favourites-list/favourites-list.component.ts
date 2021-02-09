import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { SettingsService } from 'src/app/core/service/settings.service';
import { IFavourite } from '../../../core/models/favourite.model';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: [
    './favourites-list.component.scss',
    './favourites-list-media.scss'
  ]
})
export class FavouritesListComponent implements OnInit, OnDestroy {
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
      });
    }
  }

  onDeleteFavourite(projectId: string): void {
    this.settingsService.removeUserFavourite(projectId).subscribe((data) => {
      this.userFavourites = data.favourites;
    });
  }
}

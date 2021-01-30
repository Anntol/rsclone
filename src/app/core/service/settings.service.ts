import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IFavourite } from '../models/favourite.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  serverUrl = environment.serverUrl;

  addUserFavourite(favProject: IFavourite): void {
    this.http.post(`${this.serverUrl}/api/userFavourite/add`, favProject)
    .subscribe(() => {
      console.log('Subscribed to addUserFavourite');
    }, (e) => console.error(e));
  }
}

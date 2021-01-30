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
    this.http.post(`${this.serverUrl}/api/userFavourite/`, favProject)
    .subscribe(() => {
      console.log('UserFavourite added');
    }, (e) => console.error(e)); // TODO error handling
  }

  removeUserFavourite(projectId: string): void {
    this.http.delete(`${this.serverUrl}/api/userFavourite/${projectId}`)
    .subscribe(() => {
      console.log('UserFavourite removed');
    }, (e) => console.error(e));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFavourite } from '../models/favourite.model';
import { IUserInfo } from '../models/userinfo.model';

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

  getUserFavourites(): Observable<{message: string, favourites: IFavourite[]}> {
    return this.http.get< { message: string, favourites: IFavourite[]}>(`${this.serverUrl}/api/userFavourite/`);
  }

  SaveUserInfo(userInfo: IUserInfo): void {
    this.http.post(`${this.serverUrl}/api/userSettings/`, userInfo)
    .subscribe(() => {
      console.log('UserInfo saved');
    }, (e) => console.error(e)); // TODO error handling
  }

  getUserInfoSettings(): Observable<{message: string, userInfo: IUserInfo}> {
    return this.http.get< { message: string, userInfo: IUserInfo}>(`${this.serverUrl}/api/userSettings/`);
  }
}

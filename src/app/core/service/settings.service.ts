import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { environment } from '../../../environments/environment';
import { IFavourite } from '../models/favourite.model';
import { IUserInfo } from '../models/userinfo.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  serverUrl = environment.serverUrl;

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log('handler: ', error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const msg = error.error.message as string;
    const errorMessage = msg || "An unknown error occurred!";
    this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
    return throwError(errorMessage);
  }

  addUserFavourite(favProject: IFavourite): void {
    this.http.post(`${this.serverUrl}/api/userFavourite/`, favProject)
      .pipe(catchError((e) => this.handleError(e))).subscribe();
  }

  removeUserFavourite(projectId: string): void {
    this.http.delete(`${this.serverUrl}/api/userFavourite/${projectId}`)
      .pipe(catchError((e) => this.handleError(e))).subscribe();
  }

  getUserFavourites(): Observable<{message: string, favourites: IFavourite[]}> {
    return this.http.get< { message: string, favourites: IFavourite[]}>(`${this.serverUrl}/api/userFavourite/`)
      .pipe(catchError((e) => this.handleError(e)));
  }

  SaveUserInfo(userInfo: IUserInfo): void {
    this.http.post(`${this.serverUrl}/api/userSettings/`, userInfo)
      .pipe(catchError((e) => this.handleError(e))).subscribe();
  }

  getUserInfoSettings(): Observable<{message: string, userInfo: IUserInfo}> {
    return this.http.get< { message: string, userInfo: IUserInfo}>(`${this.serverUrl}/api/userSettings/`)
    .pipe(catchError((e) => this.handleError(e)));
  }
}

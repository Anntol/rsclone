import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IUserToken } from '../models/users.models';
import { IProjects } from '../models/projects.model';
import { BASE_URL } from '../../shared/constants/constsnts';

const GLOBAL_GIVIN = {
  TOKEN: `${BASE_URL}/userservice/tokens`,
  ACTIVE_FOR_COUNTRY: (country: string) => `${BASE_URL}/public/projectservice/countries/${country}/projects/active`
};

@Injectable({
  providedIn: 'root'
})
export class GlobalGivingApiService {
  httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })
  };

  body = { auth_request: 'USER_API' };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // later replace with component
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getAccessToken(): Observable<IUserToken> {
    return this.http.post<IUserToken>(GLOBAL_GIVIN.TOKEN, this.body);
  }

  public getActiveProjectsForCountry(iso3166CountryCode: string, nextProjectID?: number): Observable<IProjects> {
    const id: number = nextProjectID || 1;
    const options = { params: new HttpParams({ fromString: `&nextProjectId=${id}` }) };
    return this.http.get<IProjects>(`${GLOBAL_GIVIN.ACTIVE_FOR_COUNTRY(iso3166CountryCode)}`, options).pipe(
      retry(3),
      catchError((e) => this.handleError(e))
    );
  }
}

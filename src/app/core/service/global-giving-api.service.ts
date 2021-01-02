import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IUserToken } from '../models/users.models';
import { BASE_URL, USER_API, API_KEY } from '../../shared/constants/constsnts';

const GLOBAL_GIVIN = {
  TOKEN: `${BASE_URL}/userservice/tokens`,
  ACTIVE_FOR_COUNTRY: (country: string) => `${BASE_URL}/public/projectservice/countries/${country}/projects/active`
};

@Injectable({
  providedIn: 'root'
})
export class GlobalGivingApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  body = { auth_request: USER_API, api_key: API_KEY };

  constructor(private http: HttpClient) {}

  public getAccessToken(): Observable<IUserToken> {
    return this.http.post<IUserToken>(GLOBAL_GIVIN.TOKEN, this.body);
  }

  public getActiveProjectsForCountry(iso3166CountryCode: string): Observable<any> {
    return this.http.get<any>(`${GLOBAL_GIVIN.ACTIVE_FOR_COUNTRY(iso3166CountryCode)}`);
  }
}

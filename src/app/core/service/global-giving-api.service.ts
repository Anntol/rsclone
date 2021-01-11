import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IUserToken } from '../models/users.models';
import { IProjects, IQueryOptions, ISearchResults } from '../models/projects.model';
import { BASE_URL, NUMBER_RETRIES_OF_REQUESTS } from '../../shared/constants/constants';

const GLOBAL_GIVIN = {
  TOKEN: `${BASE_URL}/userservice/tokens`,
  ACTIVE_BY_KEYWORD: `${BASE_URL}/public/services/search/projects`,
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
    // TODO replace with component
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
      retry(NUMBER_RETRIES_OF_REQUESTS),
      catchError((e) => this.handleError(e))
    );
  }

  public getActiveProjectsByKeyWords(queryParams: IQueryOptions): Observable<ISearchResults> {
    const query: string = queryParams.keyWords
      .split(' ')
      .map((item) => item)
      .join('+');
    const id: number = queryParams.startNumber || 0;
    let params: HttpParams = new HttpParams().set('q', query).set('start', String(id));
    let filterQuery = '';
    const country: string = queryParams.iso3166CountryCode || '';
    if (country.length !== 0) {
      filterQuery += `country:${country},`;
    }
    const themeId: string = queryParams.theme || '';
    if (themeId.length !== 0) {
      filterQuery += `theme:${themeId}`;
    }
    if (filterQuery.length !== 0) {
      params = params.set('filter', filterQuery);
    }
    return this.http
      .get<ISearchResults>(GLOBAL_GIVIN.ACTIVE_BY_KEYWORD, { params })
      .pipe(
        retry(NUMBER_RETRIES_OF_REQUESTS),
        catchError((e) => this.handleError(e))
      );
  }
}

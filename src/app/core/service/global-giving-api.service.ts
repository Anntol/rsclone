import { Injectable } from '@angular/core';
import {
 HttpClient, HttpHeaders, HttpErrorResponse, HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from '../../shared/components/error/error.component';
import { IUserToken } from '../models/users.models';
import { IProjectById, IQueryOptions, ISearchResults } from '../models/projects.model';
import { BASE_URL, NUMBER_RETRIES_OF_REQUESTS } from '../../shared/constants/constants';

const GLOBAL_GIVIN = {
  TOKEN: `${BASE_URL}/userservice/tokens`,
  ACTIVE_BY_KEYWORD: `${BASE_URL}/public/services/search/projects`,
  ACTIVE_FOR_ID: (id: number) => `${BASE_URL}/public/projectservice/projects/${id}?`
};

@Injectable({
  providedIn: 'root'
})
export class GlobalGivingApiService {
  httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })
  };

  body = { auth_request: 'USER_API' };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const apiMsg = error.error.error_response?.status as string;
    const errorMessage = apiMsg
         || (error.status !== 400 && error.statusText)
         || "An unknown error occurred!";
    this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
    return throwError(errorMessage);
  }

  public getAccessToken(): Observable<IUserToken> {
    return this.http.post<IUserToken>(GLOBAL_GIVIN.TOKEN, this.body)
      .pipe(catchError((e) => this.handleError(e)));
  }

public getActiveProjectById(projectId: number): Observable<IProjectById> {
    const id: number = projectId || 1;
      return this.http.get<IProjectById>(`${GLOBAL_GIVIN.ACTIVE_FOR_ID(id)}`).pipe(
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

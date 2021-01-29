import { Injectable } from '@angular/core';
import {
 HttpClient, HttpErrorResponse, HttpHeaders, HttpParams
} from '@angular/common/http';

import {
 Observable, of, throwError, timer
} from 'rxjs';
import {
 catchError, mergeMap, retry, retryWhen
} from 'rxjs/operators';
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

  public getAccessToken(): Observable<IUserToken> {
    return this.http.post<IUserToken>(GLOBAL_GIVIN.TOKEN, this.body);
  }

  public getActiveProjectsForCountry(iso3166CountryCode: string, nextProjectID?: number): Observable<IProjects> {
    const id: number = nextProjectID || 1;
    const options = { params: new HttpParams({ fromString: `&nextProjectId=${id}` }) };
    return this.http.get<IProjects>(`${GLOBAL_GIVIN.ACTIVE_FOR_COUNTRY(iso3166CountryCode)}`, options).pipe(
      retry(NUMBER_RETRIES_OF_REQUESTS)
    );
  }

  public getActiveProjectsByKeyWords(queryParams: IQueryOptions): Observable<ISearchResults> {
    const query: string = queryParams.keyWords
      .split(' ')
      .map((item) => item)
      .join('+');
    const id: number = queryParams.startNumber || 0;
    let params: HttpParams = new HttpParams().set('qry', query).set('start', String(id));
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
        retryWhen(this.genericRetryStrategy())
        // catchError((error) => this.handleError(error))
      );
  }

  handleError(error: unknown): Observable<never> {
    return throwError(error);
  }

  genericRetryStrategy = ({ maxRetryAttempts = NUMBER_RETRIES_OF_REQUESTS }: {
    maxRetryAttempts?: number
  } = {}) => (attempts: Observable<unknown>): Observable<number> => attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        if (retryAttempt > maxRetryAttempts) {
          console.log('generic error');
          return this.handleError(error);
        }
        console.log('attempt:', retryAttempt);
        return timer(retryAttempt);
      })
    );
}

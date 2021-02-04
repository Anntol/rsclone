import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from '../../shared/components/error/error.component';
import { environment } from '../../../environments/environment';
import { AuthData } from '../models/authdata.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  serverUrl = environment.serverUrl;

  private token: string | undefined;

  private tokenTimer: number | undefined;;

  private isUserAuthenticated = false;

  private authStatus = new Subject<boolean>();

  getToken(): string | undefined {
    return this.token;
  }

  getIsUserAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const msg = error.error.message as string;
    const errorMessage = msg || "An unknown error occurred!";
    this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
    return throwError(errorMessage);
  }

  createUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post(`${this.serverUrl}/api/user/signup`, authData)
    .subscribe(() => {
      this.loginUser(email, password);
    }, (e) => {
      this.authStatus.next(false);
      this.handleError(e);
    });
  }

  loginUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post<{token: string, expiresIn: number}>(`${this.serverUrl}/api/user/login`, authData)
    .subscribe((response) => {
      this.token = response.token;

      if(this.token) {
        this.setAuthTimer(response.expiresIn);
        const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate);
        this.changeAuthStatus(true);
      }
    }, (e) => {
      this.authStatus.next(false);
      this.handleError(e);
    });
  }

  logout(): void {
    this.clearAuthData();
    window.clearTimeout(this.tokenTimer);
    this.token = undefined;
    this.changeAuthStatus(false);
  }

  changeAuthStatus(isLogin: boolean): void {
    this.isUserAuthenticated = isLogin;
    this.authStatus.next(isLogin);

    this.router.navigate(['/'])
    .catch((e) => this.handleError(e));
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("rs_token", token);
    localStorage.setItem("rs_token_expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("rs_token");
    localStorage.removeItem("rs_token_expiration");
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = window.setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser(): void {
    const token = localStorage.getItem("rs_token");
    const expirationDate = localStorage.getItem("rs_token_expiration");
    if (!token || !expirationDate) {
      return;
    }
    const authInformation = {
      token,
      expirationDate: new Date(expirationDate)
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn / 1000);
      this.changeAuthStatus(true);
    }
  }
}

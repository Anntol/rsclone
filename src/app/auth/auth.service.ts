import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  serverUrl = environment.serverUrl;

  private token: string | undefined;

  private tokenTimer: number | undefined;;

  private isUserAuthenticated = false;

  private authStatus = new Subject<boolean>();

  getToken(): string | undefined {
    return this.token;
  }

  getIsUserAuthenticated(): boolean {
    console.log('getIsUserAuthenticated ', this.isUserAuthenticated);
    return this.isUserAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  createUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post(`${this.serverUrl}/api/user/signup`, authData)
    .subscribe(() => {
      this.loginUser(email, password);
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
    .catch((err: Error) => console.error(err.message));
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

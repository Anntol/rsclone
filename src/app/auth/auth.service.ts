import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  serverUrl = 'http://localhost:3000';

  private token: string | undefined;

  private isUserAuthenticated = false;

  private authStatus = new Subject<boolean>();

  getToken(): string | undefined {
    console.log('gettoken ', this.token);
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
    this.http.post(`${this.serverUrl}/api/user/signup`, authData).subscribe((response) => {
      console.log('authservice ', response);
    });
  }

  loginUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post<{token: string}>(`${this.serverUrl}/api/user/login`, authData).subscribe((response) => {
      console.log('authservice ', response);
      this.token = response.token;

      if(this.token) {
        this.changeAuthStatus(true);
      }
    });
  }

  logout(): void {
    this.token = undefined;
    this.changeAuthStatus(false);
  }

  changeAuthStatus(isLogin: boolean): void {
    this.isUserAuthenticated = isLogin;
    this.authStatus.next(isLogin);

    this.router.navigate(['/'])
    .catch((err: Error) => console.error(err.message));
  }
}

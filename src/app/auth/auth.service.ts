import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:3000';

  private token: string | undefined;

  getToken(): string | undefined {
    console.log('gettoken ', this.token);
    return this.token;
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
      console.log('logintoken ', this.token);
    });
  }
}

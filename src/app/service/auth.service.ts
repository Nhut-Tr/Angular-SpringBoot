import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        userName,
        password,
      },
      httpOptions
    );
  }

  register(
    userName: string,
    email: string,
    password: string,
    fullName: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        userName,
        email,
        fullName,
        password,
      },
      httpOptions
    );
  }

  verify(code: string): Observable<any> {
    return this.http.get(AUTH_API + `verify?code=${code}`);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'forget-password', email);
  }
  getTokenReset(token: string): Observable<any> {
    return this.http.get(AUTH_API + 'reset-password');
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password', { token, password });
  }

  changePassword(changePass: {
    userId: any;
    userName: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post(AUTH_API + 'change-password', changePass);
  }
}

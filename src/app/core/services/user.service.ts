import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITokenResponse } from '../models/token-response';
import { IUserInfo } from '../models/user-info';
import { IUserLogin } from '../models/user-login';

export const L_STORAGE_USER_KEY = 'USER_DATA';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(public http: HttpClient) {
    if (this.getToken) {
      this.isLogin$.next(true);
    }
  }

  token: string = '';

  logOut(): void {
    if (this.token) {
      localStorage.removeItem(L_STORAGE_USER_KEY);
    }
    this.token = '';
    this.isLogin$.next(false);
  }

  get getToken(): string {
    const token = localStorage.getItem(L_STORAGE_USER_KEY);
    if (token) {
      this.token = JSON.parse(token);
      return this.token;
    }

    return '';
  }

  public loginIn(userLogin: IUserLogin) {
    const url = `http://localhost:3004/users/login`;
    return this.http
      .post<ITokenResponse>(url, userLogin)
      .subscribe((loginData) => {
        this.token = loginData.token;
        localStorage.setItem(L_STORAGE_USER_KEY, JSON.stringify(this.token));
        this.isLogin$.next(true);
      });
  }

  public getUserInfo(): Observable<IUserInfo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken}`,
    });

    const url = `http://localhost:3004/users/userInfo`;

    return this.http.get<IUserInfo>(url, { headers });
  }
}

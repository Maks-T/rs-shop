import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLogin } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  public loginIn(userLogin: IUserLogin): Observable<string> {
    const url = `http://localhost:3004/users/login`;

    return this.http.post<string>(url, userLogin);
  }
}

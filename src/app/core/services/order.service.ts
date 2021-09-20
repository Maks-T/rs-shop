import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(public http: HttpClient, private userService: UserService) {}

  public addOrder(orderData: IOrder): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/order`;

    return this.http.post<string>(url, orderData, { headers });
  }

  public deleteOrder(id: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/order?id=${id}`;

    return this.http.delete<string>(url, { headers });
  }
}

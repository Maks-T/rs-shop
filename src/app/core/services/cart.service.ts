import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public http: HttpClient, private userService: UserService) {}

  public addFoodToCart(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/cart`;

    return this.http.post<string>(url, { id }, { headers });
  }

  public deleteFoodFromCart(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/cart?id=${id}`;

    return this.http.delete<string>(url, { headers });
  }
}

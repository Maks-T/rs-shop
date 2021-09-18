import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public http: HttpClient) {}

  public addFoodToCart(id: string): Observable<string> {
    const url = `http://localhost:3004/cart`;

    return this.http.post<string>(url, { id: id });
  }
}

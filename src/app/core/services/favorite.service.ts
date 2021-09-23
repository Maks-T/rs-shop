import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(public http: HttpClient, private userService: UserService) {}

  public addFoodToFavorite(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/favorites`;

    return this.http.post<string>(url, { id }, { headers });
  }
  public deleteFoodFromFavorite(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken}`,
    });

    const url = `http://localhost:3004/users/favorites?id=${id}`;

    return this.http.delete<string>(url, { headers });
  }
}

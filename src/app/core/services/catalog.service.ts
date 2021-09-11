import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/categories';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IFood } from '../models/food';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(public http: HttpClient) {}

  public fetchCategories(): Observable<ICategory[]> {
    const url = `http://localhost:3004/categories`;

    return this.http.get<ICategory[]>(url).pipe(take(1));
  }

  public searchFoods(query: string): Observable<IFood[]> {
    const url = `http://localhost:3004/goods/search?text=${query}`;

    return this.http.get<IFood[]>(url).pipe(take(1));
  }
}

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
  private categories$: Observable<ICategory[]> | null = null;

  constructor(public http: HttpClient) {}

  public fetchCategories(): Observable<ICategory[]> {
    if (this.categories$) {
      return this.categories$;
    }

    const url = `http://localhost:3004/categories`;

    this.categories$ = this.http.get<ICategory[]>(url).pipe(take(1));

    return this.categories$;
  }

  public searchFoods(query: string): Observable<IFood[]> {
    const url = `http://localhost:3004/goods/search?text=${query}`;

    return this.http.get<IFood[]>(url).pipe(take(1));
  }

  public fetchFoodsBySubCategory(
    categoryId: string,
    subCategoryId: string,
    start?: number,
    count?: number
  ): Observable<IFood[]> {
    const url = `http://localhost:3004/goods/category/${categoryId}/${subCategoryId}?start=${start}&count=${count}`;

    return this.http.get<IFood[]>(url).pipe(take(1));
  }

  public fetchFoodById(foodId: string): Observable<IFood> {
    const url = `http://localhost:3004/goods/item/${foodId}`;

    return this.http.get<IFood>(url).pipe(take(1));
  }
}

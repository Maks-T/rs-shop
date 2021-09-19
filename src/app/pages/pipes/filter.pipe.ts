import { Pipe, PipeTransform } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { TypeSort } from 'src/app/core/models/type-sort';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(foods: IFood[], typeSort: string): IFood[] {
    if (!foods) return [];

    switch (typeSort) {
      case TypeSort.priceDown:
        return foods.sort(
          (a, b) => Number(new Date(a.price)) - Number(new Date(b.price))
        );

      case TypeSort.priceUp:
        return foods.sort(
          (a, b) => Number(new Date(b.price)) - Number(new Date(a.price))
        );

      case TypeSort.ratingDown:
        return foods.sort(
          (a, b) => Number(new Date(a.rating)) - Number(new Date(b.rating))
        );

      case TypeSort.ratingUp:
        return foods.sort(
          (a, b) => Number(new Date(b.rating)) - Number(new Date(a.rating))
        );

      default:
        return foods;
    }
  }
}

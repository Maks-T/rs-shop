import { Component, Input, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() food!: IFood;
  @Input() categoryId!: string;
  @Input() subCategoryId!: string;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  addFoodToCart(id: string) {
    this.cartService.addFoodToCart(id).subscribe((mes) => {
      console.log('mes add to cart   :   ', mes);
    });
  }
}

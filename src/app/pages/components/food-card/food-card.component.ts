import { Component, Input, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { CartService } from 'src/app/core/services/cart.service';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() food!: IFood;
  @Input() categoryId!: string;
  @Input() subCategoryId!: string;

  isShow: boolean = true;

  constructor(
    public cartService: CartService,

    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {}

  addFoodToCart(id: string) {
    this.cartService.addFoodToCart(id).subscribe((mes) => {
      this.food.isInCart = true;
    });
  }

  deleteFoodFromCart(id: string) {
    this.cartService.deleteFoodFromCart(id).subscribe((mes) => {
      this.food.isInCart = false;
    });
  }

  addFoodToFavorite(id: string) {
    this.favoriteService.addFoodToFavorite(id).subscribe((mes) => {
      this.food.isFavorite = true;
    });
  }

  deleteFoodFromFavorite(id: string) {
    this.food.isFavorite = false;
    this.favoriteService.deleteFoodFromFavorite(id).subscribe((mes) => {});
  }
}

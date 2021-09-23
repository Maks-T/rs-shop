import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/core/models/categories';
import { IFood } from 'src/app/core/models/food';
import { IUserInfo } from 'src/app/core/models/user-info';
import { CartService } from 'src/app/core/services/cart.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent implements OnInit {
  category?: ICategory;
  categoryName: string = '';
  subCategoryName: string = '';
  categoryId: string = '';
  subCategoryId: string = '';
  foodId: string = '';
  food!: IFood;
  userInfo!: IUserInfo;

  constructor(
    private catalogService: CatalogService,
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.subCategoryId = params['subCategoryId'];
      this.foodId = params['foodId'];

      this.catalogService.fetchCategories().subscribe((categories) => {
        this.category = categories.find(
          (category) => category.id === this.categoryId
        );

        if (this.category) {
          this.categoryName = this.category.name;

          this.subCategoryName = this.category.subCategories.find(
            (subCategory) => (subCategory.id = this.subCategoryId)
          )?.name as string;
        }
      });

      this.catalogService.fetchFoodById(this.foodId).subscribe((food) => {
        this.food = food;
        this.loadFood();
      });
    });
  }
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

  loadFood() {
    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;

      const findIdFavorite = this.userInfo.favorites.find(
        (favorite) => favorite === this.food.id
      );

      const findIdCart = this.userInfo.cart.find(
        (cart) => cart === this.food.id
      );

      if (this.food.id === findIdFavorite) {
        this.food.isFavorite = true;
      }

      if (this.food.id === findIdCart) {
        this.food.isInCart = true;
      }
    });
  }
}

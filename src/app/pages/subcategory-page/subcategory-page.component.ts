import { Component, Input, OnChanges, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/core/models/categories';
import { IFood } from 'src/app/core/models/food';
import { TypeSort } from 'src/app/core/models/type-sort';
import { IUserInfo } from 'src/app/core/models/user-info';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
})
export class SubcategoryPageComponent implements OnInit, OnChanges {
  category?: ICategory;
  categoryName: string = '';
  subCategoryName: string = '';
  categoryId: string = '';
  subCategoryId: string = '';
  foods: IFood[] = [];
  start = 0;
  count = 10;
  loadFoodsComlete = false;
  userInfo!: IUserInfo;
  typeSort = '';

  typeSortPriceUp = true;
  typeSortRatingUp = true;

  TypeSort = TypeSort;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.subCategoryId = params['subCategoryId'];

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

      this.loadFoods();
    });
  }
  ngOnChanges(): void {
    // this.loadFoods();
  }

  loadFoods() {
    this.start = this.foods.length;

    this.catalogService
      .fetchFoodsBySubCategory(
        this.categoryId,
        this.subCategoryId,
        this.start,
        this.count
      )
      .subscribe((foods) => {
        this.userService.getUserInfo().subscribe((userInfo) => {
          this.userInfo = userInfo;
          const newFoods = foods.map((food) => {
            const findIdFavorite = this.userInfo.favorites.find(
              (favorite) => favorite === food.id
            );

            const findIdCart = this.userInfo.cart.find(
              (cart) => cart === food.id
            );

            if (food.id === findIdFavorite) {
              food.isFavorite = true;
            }

            if (food.id === findIdCart) {
              food.isInCart = true;
            }

            return food;
          });

          this.foods = this.foods.concat(newFoods);
          if (this.foods.length - this.start < this.count) {
            this.loadFoodsComlete = true;
          }
        });
      });
  }

  changeTypeSort(typeSort: TypeSort) {
    if (typeSort === TypeSort.price) {
      if (this.typeSortPriceUp) {
        this.typeSort = TypeSort.priceUp;
      } else {
        this.typeSort = TypeSort.priceDown;
      }
      this.typeSortPriceUp = !this.typeSortPriceUp;
    }

    if (typeSort === TypeSort.rating) {
      if (this.typeSortRatingUp) {
        this.typeSort = TypeSort.ratingUp;
      } else {
        this.typeSort = TypeSort.ratingDown;
      }
      this.typeSortRatingUp = !this.typeSortRatingUp;
    }
  }
}

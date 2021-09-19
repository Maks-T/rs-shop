import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/core/models/categories';
import { IFood } from 'src/app/core/models/food';
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
  userInfo!: IUserInfo;

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
    this.catalogService
      .fetchFoodsBySubCategory(this.categoryId, this.subCategoryId)
      .subscribe((foods) => {
        this.userService.getUserInfo().subscribe((userInfo) => {
          this.userInfo = userInfo;
          this.foods = foods.map((food) => {
            const findIdFavorite = this.userInfo.favorites.find(
              (favorite) => favorite === food.id
            );
            if (food.id === findIdFavorite) {
              food.isFavorite = true;
            }

            return food;
          });
        });
      });
  }
}

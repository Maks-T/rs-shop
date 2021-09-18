import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/core/models/categories';
import { IFood } from 'src/app/core/models/food';
import { CatalogService } from 'src/app/core/services/catalog.service';

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

  constructor(
    private catalogService: CatalogService,
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
      });
    });
  }
}

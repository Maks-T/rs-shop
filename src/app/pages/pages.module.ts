import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SharedModule } from '../shared/shared.module';
import { PopularSliderComponent } from './components/popular-slider/popular-slider.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubcategoryPageComponent } from './subcategory-page/subcategory-page.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { AmountPipe } from './pipes/amount.pipe';
import { FoodPageComponent } from './food-page/food-page.component';
import { FoodSliderComponent } from './components/food-slider/food-slider.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainSliderComponent,
    PopularSliderComponent,
    CategoryPageComponent,
    SubcategoryPageComponent,
    FoodCardComponent,
    AmountPipe,
    FoodPageComponent,
    FoodSliderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MainPageComponent },
      { path: 'category', component: CategoryPageComponent },
      { path: 'subcategory', component: SubcategoryPageComponent },
      { path: 'food', component: FoodPageComponent },
    ]),
  ],
  exports: [RouterModule, AmountPipe],
})
export class PagesModule {}

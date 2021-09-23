import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { IUserInfo } from 'src/app/core/models/user-info';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  foods: IFood[] = [];
  userInfo!: IUserInfo;
  constructor(
    private userService: UserService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;

      userInfo.favorites.forEach((favorite) => {
        this.catalogService.fetchFoodById(favorite).subscribe((food) => {
          food.isFavorite = true;
          this.foods.push(food);
        });
      });
    });
  }
}

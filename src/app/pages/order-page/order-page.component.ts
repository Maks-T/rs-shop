import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { IOrder } from 'src/app/core/models/order';
import { IUserInfo } from 'src/app/core/models/user-info';
import { CartService } from 'src/app/core/services/cart.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  userInfo!: IUserInfo;
  orders: IOrder[] = [];

  currentFoods: IFood[] = [];
  currentOrder!: IOrder;
  constructor(
    private userService: UserService,
    private catalogService: CatalogService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;
      this.orders = userInfo.orders;
    });
  }

  orderSelect(order: IOrder) {
    this.currentOrder = order;
    order.items.forEach((item) => {
      this.currentFoods = [];
      this.catalogService.fetchFoodById(item.id).subscribe((food) => {
        this.currentFoods.push(food);
      });
    });
  }
}

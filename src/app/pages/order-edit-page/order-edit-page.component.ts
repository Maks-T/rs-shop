import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFood } from 'src/app/core/models/food';
import { IOrder } from 'src/app/core/models/order';
import { Details, Item, IUserInfo } from 'src/app/core/models/user-info';

import { CatalogService } from 'src/app/core/services/catalog.service';
import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';

const phoneRexExp = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';

@Component({
  selector: 'app-order-edit-page',
  templateUrl: './order-edit-page.component.html',
  styleUrls: ['./order-edit-page.component.scss'],
})
export class OrderEditPageComponent implements OnInit {
  isShowMessageOrder: boolean = false;
  isShowFormOrder: boolean = true;

  orderId = '';
  foods: IFood[] = [];

  userInfo!: IUserInfo;
  order!: IOrder;
  detailsOrder!: Details;
  items: Item[] = [];

  public name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  public address = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(250),
  ]);

  public phone = new FormControl('', [
    Validators.required,
    Validators.pattern(phoneRexExp),
  ]);

  public timeToDeliver = new FormControl('', [Validators.required]);

  public comment = new FormControl('', [Validators.maxLength(250)]);

  public form!: FormGroup;

  constructor(
    private userService: UserService,
    private catalogService: CatalogService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') as string;

    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;

      this.order = userInfo.orders[Number(this.orderId)];

      this.detailsOrder = this.order.details;

      this.items = userInfo.orders[Number(this.orderId)].items;

      this.items.forEach((item) => {
        this.catalogService.fetchFoodById(item.id).subscribe((food) => {
          this.foods.push(food);
        });
      });

      this.form = new FormGroup({
        name: this.name,
        address: this.address,
        phone: this.phone,
        timeToDeliver: this.timeToDeliver,
        comment: this.comment,
      });

      this.form.patchValue({
        name: this.detailsOrder.name,
        address: this.detailsOrder.address,
        phone: this.detailsOrder.phone,
        timeToDeliver: this.detailsOrder.timeToDeliver,
        comment: this.detailsOrder.comment,
      });
    });
  }

  decreaseCountFood(index: number) {
    if (this.items[index].amount > 1) {
      this.items[index].amount -= 1;
    }
  }

  increaseCountFood(index: number) {
    if (this.items[index].amount < Number(this.foods[index].availableAmount)) {
      this.items[index].amount += 1;
    } else {
      alert('товаров больше нет на складе');
    }
  }

  public getErrorMessage(): string {
    return 'введите корректные данные';
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formData: Details = this.form.value;
      this.detailsOrder = formData;

      const orderData: IOrder = {
        items: this.items,
        details: this.detailsOrder,
        id: this.order.id,
      };

      console.log(orderData);
      this.orderService
        .updateOrder(orderData)
        .subscribe((mes: any) => console.log(mes));
      this.isShowMessageOrder = true;
      this.isShowFormOrder = false;
      this.foods = [];
      this.items = [];
    }
  }

  deleteFoodFromOrder(index: number) {
    this.items.splice(index, 1);
    this.foods.splice(index, 1);
  }
}

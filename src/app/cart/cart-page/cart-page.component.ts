import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFood } from 'src/app/core/models/food';
import { IOrder } from 'src/app/core/models/order';
import { Details, Item, IUserInfo } from 'src/app/core/models/user-info';
import { CartService } from 'src/app/core/services/cart.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';

const phoneRexExp = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  foods: IFood[] = [];

  userInfo!: IUserInfo; //??????????
  detailsOrder!: Details;
  items: Item[] = [];

  isShowBtnCheckOrder: boolean = true;
  isShowFormOrder: boolean = false;
  isShowMessageOrder: boolean = false;

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
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log(' this.userInfo  ', this.userInfo);
      userInfo.cart.forEach((cart) => {
        this.catalogService.fetchFoodById(cart).subscribe((food) => {
          this.items.push({ id: cart, amount: 1 });
          this.foods.push(food);
        });
      });
    });

    this.form = new FormGroup({
      name: this.name,
      address: this.address,
      phone: this.phone,
      timeToDeliver: this.timeToDeliver,
      comment: this.comment,
    });
  }

  decreaseCountFood(index: number) {
    if (this.items[index].amount > 0) {
      this.items[index].amount -= 1;
    }
  }

  increaseCountFood(index: number) {
    console.log('товаров на складе - ', this.foods[index].availableAmount);
    if (this.items[index].amount < Number(this.foods[index].availableAmount)) {
      this.items[index].amount += 1;
    } else {
      alert('товаров больше нет на складе');
    }
  }

  public getErrorMessage(): string {
    return 'введите корректные данные';
    /*
    if (this.login.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.hasError('login') ? 'Not a valid login' : '';*/
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formData: Details = this.form.value;
      this.detailsOrder = formData;
      console.log('formData', formData);

      const orderData: IOrder = {
        items: this.items,
        details: this.detailsOrder,
      };

      console.log('orderData ', orderData);
      this.cartService
        .createOrder(orderData)
        .subscribe((mes) => console.log(mes));

      this.isShowFormOrder = false;
      this.isShowMessageOrder = true;

      this.foods = [];
      this.items = [];
    }
  }
}

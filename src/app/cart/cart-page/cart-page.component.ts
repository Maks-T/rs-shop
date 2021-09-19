import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFood } from 'src/app/core/models/food';
import { IOrder } from 'src/app/core/models/order';
import { Details, IUserInfo } from 'src/app/core/models/user-info';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  foods: IFood[] = [];
  countFoods: number[] = [];
  userInfo!: IUserInfo; //??????????

  isShowFormOrder: boolean = false;

  /*"name": "string",
    "address": "string",
    "phone": "string",
    "timeToDeliver": "string",
    "comment": "string" */

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

  public phone = new FormControl('', [Validators.required]);

  public timeToDeliver = new FormControl('', [Validators.required]);

  public comment = new FormControl('', [Validators.maxLength(250)]);

  public form!: FormGroup;

  constructor(
    private userService: UserService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;
      userInfo.cart.forEach((cart) => {
        this.catalogService.fetchFoodById(cart).subscribe((food) => {
          this.foods.push(food);
          this.countFoods.push(1);
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
    if (this.countFoods[index] > 0) {
      this.countFoods[index] -= 1;
    }
  }

  increaseCountFood(index: number) {
    console.log('товаров на складе - ', this.foods[index].availableAmount);
    if (this.countFoods[index] < Number(this.foods[index].availableAmount)) {
      this.countFoods[index] += 1;
    } else {
      alert('товаров больше нет на складе');
    }
  }

  public getErrorMessage(): string {
    return 'error';
    /*
    if (this.login.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.hasError('login') ? 'Not a valid login' : '';*/
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formData: Details = this.form.value;

      console.log('formData', formData);
    }
  }
}

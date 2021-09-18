import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CartPageComponent }]),
  ],
  exports: [RouterModule],
})
export class CartModule {}

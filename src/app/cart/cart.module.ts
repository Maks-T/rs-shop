import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CartPageComponent }]),
    SharedModule,
  ],
  exports: [RouterModule],
})
export class CartModule {}

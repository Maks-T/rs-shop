import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, MainSliderComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: MainPageComponent }]),
  ],
})
export class MainPageModule {}

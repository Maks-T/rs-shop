import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { IFood } from '../../../core/models/food';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
})
export class MainSliderComponent implements OnInit {
  foods: IFood[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.searchFoods('те').subscribe((foods) => {
      this.foods = foods;
    });
  }
}

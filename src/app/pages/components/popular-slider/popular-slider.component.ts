import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';
import { CatalogService } from 'src/app/core/services/catalog.service';

@Component({
  selector: 'app-popular-slider',
  templateUrl: './popular-slider.component.html',
  styleUrls: ['./popular-slider.component.scss'],
})
export class PopularSliderComponent implements OnInit {
  mapQuery = ['sa', 'пыл', 'ча', 'тел', 'фо', 'да'];
  foods: IFood[][] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.mapQuery.forEach((query, index) => {
      this.catalogService.searchFoods(query).subscribe((foods) => {
        this.foods[index] = foods;
        this.foods[index].length = 6;
      });
    });
  }
}

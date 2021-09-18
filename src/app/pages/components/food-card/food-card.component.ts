import { Component, Input, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/models/food';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() food!: IFood;
  @Input() categoryId!: string;
  @Input() subCategoryId!: string;

  constructor() {}

  ngOnInit(): void {}
}

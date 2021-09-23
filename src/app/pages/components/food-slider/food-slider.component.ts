import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-slider',
  templateUrl: './food-slider.component.html',
  styleUrls: ['./food-slider.component.scss'],
})
export class FoodSliderComponent implements OnInit {
  @Input() imageUrls: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}

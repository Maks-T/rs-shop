import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLocation: string = 'Минск';
  showCatalog: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.currentLocation = this.getLocationCity();
  }

  getLocationCity(): string {
    return 'Минск';
  }
}

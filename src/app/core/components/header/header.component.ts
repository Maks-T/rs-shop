import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICategory } from '../../models/categories';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: ICategory[] = [];
  currentLocation: string = 'Минск';
  showCatalog: boolean = false;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.currentLocation = this.getLocationCity();
    this.catalogService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getLocationCity(): string {
    return 'Минск';
  }
}

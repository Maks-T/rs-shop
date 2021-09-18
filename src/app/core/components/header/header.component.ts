import { Component, Input, OnInit } from '@angular/core';
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
  showLoginInfo: boolean = false;
  showLoginForm: boolean = false;

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

  getShowLoginInfoFalse() {
    this.showLoginInfo = false;
    this.showLoginForm = true;
  }

  getShowLoginFormFalse() {
    this.showLoginForm = false;
  }

  getCatalogPopupFalse() {
    this.showCatalog = false;
  }
}

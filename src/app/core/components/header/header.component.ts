import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { ICategory } from '../../models/categories';
import { ILocation } from '../../models/location';
import { CatalogService } from '../../services/catalog.service';
import { LocationService } from '../../services/location.service';

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
  showLocationPopup: boolean = false;
  city = 'Минск';

  constructor(
    private catalogService: CatalogService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.currentLocation = this.getLocationCity();
    this.catalogService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getLocationCity(): string {
    if (this.locationService.autoLocation) {
      this.locationService.getLocation().subscribe((location) => {
        this.city = location.city;
      });
    } else {
      this.city = this.locationService.getStaticLocation();
    }
    return this.city;
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

  getShowLocationPopupFalse() {
    this.showLocationPopup = false;
  }
  setLocation(location: string) {
    this.locationService.saveLocation(location);
    this.city = location;
  }
}

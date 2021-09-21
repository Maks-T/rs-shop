import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, take, takeUntil } from 'rxjs/operators';

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

  showCatalog: boolean = false;
  showLoginInfo: boolean = false;
  showLoginForm: boolean = false;
  showLocationPopup: boolean = false;
  showContactPopup: boolean = false;

  city = 'Минск';
  destroyed$ = new Subject<boolean>();
  constructor(
    private catalogService: CatalogService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getLocationCity();
    this.catalogService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getLocationCity(): string {
    if (this.locationService.autoLocation) {
      this.locationService
        .getLocation()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((location) => {
          this.city = location.city;
        });
    } else {
      this.destroyed$.next();
      this.destroyed$.complete();
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

  getShowContactPopupFalse() {
    this.showContactPopup = false;
  }

  setLocation(location: string) {
    this.locationService.saveLocation(location);
    this.city = location;
  }
}

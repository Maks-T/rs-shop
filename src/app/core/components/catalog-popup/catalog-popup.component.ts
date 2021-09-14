import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory, ISubCategory } from '../../models/categories';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog-popup',
  templateUrl: './catalog-popup.component.html',
  styleUrls: ['./catalog-popup.component.scss'],
})
export class CatalogPopupComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  categories: ICategory[] = [];

  currentCategoryItem: ISubCategory[] = [];

  currentCategoryItemName: string = '';

  currentCategoryItemId: string = '';

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    const categories$: Observable<ICategory[]> =
      this.catalogService.fetchCategories();

    categories$.pipe(takeUntil(this.destroyed$)).subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
      this.currentCategoryItemName = categories[0].name;
      this.currentCategoryItemId = categories[0].id;
      this.currentCategoryItem = categories[0].subCategories;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  itemFocused(item: ICategory): void {
    this.currentCategoryItemName = item.name;
    this.currentCategoryItem = item.subCategories;
    this.currentCategoryItemId = item.id;
  }
}

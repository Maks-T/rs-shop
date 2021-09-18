import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { IFood } from '../../models/food';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  inputSearchText = '';

  foods: IFood[] = [];

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((res) => res.length > 1),
        debounceTime(1000),
        takeUntil(this.destroyed$)
      )
      .subscribe((searchText: string) => {
        this.catalogService
          .searchFoods(searchText)
          .pipe(takeUntil(this.destroyed$))
          .subscribe((foods) => {
            this.foods = foods;
          });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  clickBtnSearch(): void {}

  clearSearchText(): void {
    this.inputSearchText = '';
    this.foods = [];
  }
}

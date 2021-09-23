import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/models/categories';
import { CatalogService } from 'src/app/core/services/catalog.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  category?: ICategory;
  categoryId = '';
  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.catalogService.fetchCategories().subscribe((categories) => {
        this.category = categories.find(
          (category) => category.id === this.categoryId
        );
      });
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogPopupComponent } from './components/catalog-popup/catalog-popup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SearchComponent, CatalogPopupComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, SearchComponent],
})
export class CoreModule {}

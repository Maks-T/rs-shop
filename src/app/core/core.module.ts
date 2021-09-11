import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SearchComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, SearchComponent],
})
export class CoreModule {}

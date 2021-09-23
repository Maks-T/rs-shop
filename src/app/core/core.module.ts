import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogPopupComponent } from './components/catalog-popup/catalog-popup.component';
import { RouterModule } from '@angular/router';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { LoginInfoPopupComponent } from './components/login-info-popup/login-info-popup.component';
import { LocationPopupComponent } from './location-popup/location-popup.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactPopupComponent } from './components/contact-popup/contact-popup.component';
import { MenuIconDirective } from './directives/menu-icon.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    CatalogPopupComponent,
    LoginPopupComponent,
    LoginInfoPopupComponent,
    LocationPopupComponent,
    FooterComponent,
    ContactPopupComponent,
    MenuIconDirective,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    MenuIconDirective,
  ],
})
export class CoreModule {}

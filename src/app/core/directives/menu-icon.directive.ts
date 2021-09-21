import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMenuIcon]',
})
export class MenuIconDirective implements OnInit {
  @Input() public categoryName!: string;

  @HostBinding('class.icon-hobby') public iconActiveHobby: boolean = false;
  @HostBinding('class.icon-computers') public iconActiveComputers: boolean =
    false;
  @HostBinding('class.icon-furniture') public iconActiveFurniture: boolean =
    false;
  @HostBinding('class.icon-electonics') public iconActiveElectonics: boolean =
    false;
  @HostBinding('class.icon-appliances') public iconActiveAppliances: boolean =
    false;

  constructor() {}

  ngOnInit(): void {
    switch (this.categoryName) {
      case 'Досуг и хобби': {
        this.iconActiveHobby = true;
        break;
      }
      case 'Компьютеры и периферия': {
        this.iconActiveComputers = true;
        break;
      }
      case 'Мебель': {
        this.iconActiveFurniture = true;
        break;
      }
      case 'Электроника': {
        this.iconActiveElectonics = true;
        break;
      }
      case 'Бытовая техника': {
        this.iconActiveAppliances = true;
        break;
      }
    }
  }
}

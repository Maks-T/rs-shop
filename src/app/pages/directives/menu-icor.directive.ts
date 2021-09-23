import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMenuIcor]',
})
export class MenuIcorDirective implements OnInit {
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
    }
  }
}

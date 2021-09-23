import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAmountColor]',
})
export class AmountColorDirective implements OnInit {
  @Input() public availableAmount!: number;
  @HostBinding('class.icon-red') public iconActiveYellow: boolean = false;
  @HostBinding('class.icon-yellow') public iconActiveRed: boolean = false;
  @HostBinding('class.icon-green') public iconActiveGreen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.availableAmount > 0 && this.availableAmount < 5) {
      this.iconActiveRed = true;
      this.iconActiveYellow = false;
      this.iconActiveGreen = false;
    } else if (this.availableAmount > 5 && this.availableAmount < 20) {
      this.iconActiveRed = false;
      this.iconActiveYellow = true;
      this.iconActiveGreen = false;
    } else if (this.availableAmount > 20) {
      this.iconActiveRed = false;
      this.iconActiveYellow = false;
      this.iconActiveGreen = true;
    } else {
      this.iconActiveRed = false;
      this.iconActiveYellow = false;
      this.iconActiveGreen = false;
    }
  }
}

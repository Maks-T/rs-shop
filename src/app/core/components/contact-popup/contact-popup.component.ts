import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-popup',
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss'],
})
export class ContactPopupComponent implements OnInit {
  @Output() showContactPopupFalse: EventEmitter<void> =
    new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clickBtnClose() {
    this.showContactPopupFalse.emit();
  }
}

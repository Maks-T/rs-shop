import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-info-popup',
  templateUrl: './login-info-popup.component.html',
  styleUrls: ['./login-info-popup.component.scss'],
})
export class LoginInfoPopupComponent implements OnInit {
  @Output() showLoginInfoFalse: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clickBtnLoginIn() {
    this.showLoginInfoFalse.emit();
  }
}

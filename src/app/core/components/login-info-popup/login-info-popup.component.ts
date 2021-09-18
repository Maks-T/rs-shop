import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo } from '../../models/user-info';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-info-popup',
  templateUrl: './login-info-popup.component.html',
  styleUrls: ['./login-info-popup.component.scss'],
})
export class LoginInfoPopupComponent implements OnInit {
  @Output() showLoginInfoFalse: EventEmitter<void> = new EventEmitter<void>();

  isLogin: boolean = false;

  userInfo!: IUserInfo;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
      if (this.isLogin) {
        this.userService.getUserInfo().subscribe((userInfo) => {
          this.userInfo = userInfo;
        });
      }
    });
  }

  clickBtnLoginIn() {
    this.showLoginInfoFalse.emit();
  }

  clickBtnLoginOut() {
    this.userService.logOut();
    this.showLoginInfoFalse.emit();
  }
}

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUserLogin } from '../../models/user-login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  @Output() showLoginFormFalse: EventEmitter<void> = new EventEmitter<void>();

  public login = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  public form!: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({ login: this.login, password: this.password });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getLoginErrorMessage(): string {
    if (this.login.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.hasError('login') ? 'Not a valid login' : '';
  }

  public getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formData: IUserLogin = this.form.value;
      this.userService.loginIn(formData);
    }
    this.userService.isLogin$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isLogin) => {
        if (isLogin) this.clickBtnClose();
      });
  }

  clickBtnClose() {
    this.showLoginFormFalse.emit();
  }
}

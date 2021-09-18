import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserLogin } from '../../models/user';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  @Output() showLoginFormFalse: EventEmitter<void> = new EventEmitter<void>();

  public email = new FormControl('', [Validators.required, Validators.email]);

  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  public form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({ email: this.email, password: this.password });
    /* if (this.authService.isLogin) {
        this.router.navigate(['search']);
      }*/
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
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
      /* if (this.authService.checkLoginData(formData)) {
        this.router.navigate(['search']);
      }*/
    }
  }

  clickBtnClose() {
    this.showLoginFormFalse.emit();
  }
}

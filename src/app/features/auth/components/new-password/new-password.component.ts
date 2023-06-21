import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resetPasswordNewPassword } from '../../store/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  resetPasswordForm: FormGroup;
  hide: boolean
  repeatHide: boolean
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.pattern("^.{8,50}$")]],
      repeatPassword: ['', [Validators.pattern("^.{8,50}$")]],
    });
    this.hide = true
    this.repeatHide = true
  }

  changeIconColor(btnName: string) {
    let btnClass: string
    if (this.resetPasswordForm.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.resetPasswordForm.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }

  onReturnResetPassword(event: Event) {
    localStorage.removeItem("reset-token")
    event.preventDefault();
    this.router.navigate(["auth/reset-password"])
  }

  onReturnLogin(event: Event) {
    localStorage.removeItem("reset-token")
    event.preventDefault();
    this.router.navigate(["auth/login"])
  }

  onSubmit() {
    let password = this.resetPasswordForm.get('password')?.value;
    let repeatPassword = this.resetPasswordForm.get('repeatPassword')?.value;
    if (this.resetPasswordForm.valid && password === repeatPassword) {
      this.store.dispatch(resetPasswordNewPassword({ password }));
    }
  }

}

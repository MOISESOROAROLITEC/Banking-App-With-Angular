import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resetPasswordVerifyEmail } from '../../store/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email]],
    });
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

  onReturnLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(["auth/login"])
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let email = this.resetPasswordForm.get('email')?.value;
      this.store.dispatch(resetPasswordVerifyEmail({ email }));
    }
  }
}

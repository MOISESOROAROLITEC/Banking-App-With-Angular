import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Unsubscribable, of } from 'rxjs';
import { createUser } from '../../store/user.actions';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent implements OnDestroy {
  signUpForm: FormGroup;
  emailAlreadyExistError = ""
  hide: boolean
  check: boolean
  userCreated: boolean = false
  subscription!: Unsubscribable;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
    private toast: ToastService
  ) {

    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.maxLength(50), Validators.minLength(4)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern("^.{8,50}$")]],
    });

    this.hide = true
    this.check = false

  }

  changeCheckedState() {
    this.check = !this.check
  }

  onInput() {
    this.emailAlreadyExistError = ""
  }

  onChange() {
  }

  changeIconColor(btnName: string) {
    let btnClass: string
    if (this.signUpForm.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.signUpForm.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }

  ngOnDestroy() {
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      let name = this.signUpForm.get('username')?.value
      let email = this.signUpForm.get('email')?.value
      let password = this.signUpForm.get('password')?.value
      this.store.dispatch(createUser({ userDatas: { name, email, password } }))
    }
  }

}

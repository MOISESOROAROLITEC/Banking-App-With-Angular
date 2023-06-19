import { Component } from '@angular/core';
import { UserDatasLogin } from 'src/app/shared/constantes/constantes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginUser } from '../../store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  requestErroMessage = ""
  emailAlreadyExistError = ""
  hide: boolean
  check: boolean

  userData: UserDatasLogin

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern("^.{8,50}$")]],
    });

    this.hide = true
    this.check = false
    this.userData = {
      email: "",
      password: "",
    }
  }

  changeCheckedState() {
    this.check = !this.check
  }

  changeIconColor(btnName: string) {
    let btnClass: string
    if (this.loginForm.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.loginForm.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }

  onInput() {
    this.requestErroMessage = ""
    this.emailAlreadyExistError = ""
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value
      let password = this.loginForm.get('password')?.value
      this.store.dispatch(loginUser({ loginDatas: { email, password } }))
    }
  }

}

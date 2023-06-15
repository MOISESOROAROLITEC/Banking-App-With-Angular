import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserDatasSignUp } from 'src/app/shared/constantes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeUserEmail, changeUserName, changeUserToken } from '../../store/user.actions';
import { UserDatas } from 'src/app/shared/constantes';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent {
  signUpForm: FormGroup;
  requestErroMessage = ""
  emailAlreadyExistError = ""
  hide: boolean
  check: boolean
  userCreated: boolean = false
  userData: UserDatasSignUp

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.maxLength(50), Validators.minLength(4)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern("^.{8,50}$")]],
    });

    this.hide = true
    this.check = false
    this.userData = {
      name: "",
      email: "",
      password: "",
    }
  }

  changeCheckedState() {
    this.check = !this.check
  }

  onInput() {
    this.requestErroMessage = ""
    this.emailAlreadyExistError = ""
  }

  onChange() {
  }


  onSubmit(type?: string) {
    if (type != "submit") {
      return
    }
    if (this.signUpForm.valid) {
      this.userData.name = this.signUpForm.get('username')?.value
      this.userData.email = this.signUpForm.get('email')?.value
      this.userData.password = this.signUpForm.get('password')?.value

      this.authService.createUser(this.userData).subscribe(
        {
          next: (response) => {
            this.userCreated = true
            const res = response as UserDatas
            this.authService.saveUserDatas(res.name, res.email, res.token)
            this.router.navigate(["/dashboard"])
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status == 401) {
                this.emailAlreadyExistError = error.error.message
              } else if (error.status == 400) {
                this.emailAlreadyExistError = error.error.message
              } else {
                this.requestErroMessage = error.error.message
              }
            }
          },
          complete: () => { }
        }
      )
    }
  }

}

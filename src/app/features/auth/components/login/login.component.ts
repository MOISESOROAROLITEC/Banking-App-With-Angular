import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserDatas, UserDatasLogin } from 'src/app/shared/constantes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  requestErroMessage = ""
  emailAlreadyExistError = ""
  hide = true
  check = false

  userData: UserDatasLogin = {
    email: "",
    password: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern("^.{8,50}$")]],
    });
  }

  changeCheckedState() {
    this.check = !this.check
  }

  onInput() {
    this.requestErroMessage = ""
    this.emailAlreadyExistError = ""
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userData.email = this.loginForm.get('email')?.value
      this.userData.password = this.loginForm.get('password')?.value
      this.authService.login(this.userData).subscribe(
        {
          next: (response) => {
            const res = response as UserDatas
            this.authService.saveUserDatas(res.name, res.email, res.token)
            this.router.navigate(["/dashboard"]);
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this.requestErroMessage = error.error.message
            }
          },
          complete: () => { }
        }
      )
    }
  }

}
function changeUserName(arg0: { newName: string; }): any {
  throw new Error('Function not implemented.');
}

function changeUserEmail(arg0: { newEmail: string; }): any {
  throw new Error('Function not implemented.');
}

function changeUserToken(arg0: { newToken: string; }): any {
  throw new Error('Function not implemented.');
}


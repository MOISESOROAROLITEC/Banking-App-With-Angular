import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserDatasLogin } from 'src/app/shared/constantes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
    this.userData.email = this.loginForm.get('email')?.value
    this.userData.password = this.loginForm.get('password')?.value
    this.authService.login(this.userData)?.subscribe(
      (response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status == 401) {
            this.emailAlreadyExistError = "Cette adress email est déjàs utilisé"
          } else if (response.status == 400) {
            this.emailAlreadyExistError = "Le format de l'email est incorrect"
          }
        } else {
          this.router.navigate(["/login"])
        }
      }
    )
  }

}

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserDatas } from 'src/app/shared/constantes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent {
  signUpForm: FormGroup;
  requestErroMessage = ""
  emailAlreadyExistError = ""
  hide = true
  check = false
  userData = new UserDatas()

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.maxLength(50), Validators.minLength(4)]],
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
    this.userData.name = this.signUpForm.get('username')?.value
    this.userData.email = this.signUpForm.get('email')?.value
    this.userData.password = this.signUpForm.get('password')?.value
    this.authService.createUser(this.userData)?.subscribe(
      (response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status == 401) {
            this.emailAlreadyExistError = "Cette adress email est déjàs utilisé"
          } else if (response.status == 400) {
            this.emailAlreadyExistError = "Le format de l'email est incorrect"
          }
          return
        }
        this.router.navigate([""])
      }
    )
  }

}

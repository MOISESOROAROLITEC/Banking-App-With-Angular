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

    this.hide = false
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

  saveUserDatas(name: string, email: string, token: string | undefined) {
    localStorage.setItem('username', name)
    this.store.dispatch(changeUserName({ newName: name }))
    localStorage.setItem('email', email)
    this.store.dispatch(changeUserEmail({ newEmail: email }))
    if (token) {
      localStorage.setItem('token', token)
      this.store.dispatch(changeUserToken({ newToken: token }))
    }
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.userData.name = this.signUpForm.get('username')?.value
      this.userData.email = this.signUpForm.get('email')?.value
      this.userData.password = this.signUpForm.get('password')?.value

      this.authService.createUser(this.userData).subscribe(
        {
          next: (response) => {
            if (response instanceof HttpErrorResponse) {
              if (response.status == 401) {
                this.emailAlreadyExistError = "Cette adress email est déjàs utilisé"
              } else if (response.status == 400) {
                this.emailAlreadyExistError = "Le format de l'email est incorrect"
              }
            } else {
              this.userCreated = true
              const res = response as UserDatas
              this.saveUserDatas(res.name, res.email, res.token)
              this.router.navigate(["/dashboard"])
            }
          },
          error: (error) => { },
          complete: () => {
            if (!this.userCreated && !this.emailAlreadyExistError)
              this.requestErroMessage = "Erreur de connection au serveur"
          }
        }
      )
    }
  }

}

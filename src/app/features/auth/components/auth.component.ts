import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDatas } from 'src/app/shared/constantes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],

})
export class AuthComponent {
  username: string = ""
  mail = ""
  password = ""
  requestErroMessage = ""
  emailAlreadyExistError = ""
  hide = true
  check = false
  userData = new UserDatas()

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  changeCheckedState() {
    this.check = !this.check
  }

  onInput() {
    this.requestErroMessage = ""
    this.emailAlreadyExistError = ""
  }

  onSubmit() {
    this.userData.name = this.username
    this.userData.email = this.mail
    this.userData.password = this.password
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

        localStorage.setItem("token", (response as { token: string }).token)
        this.router.navigate([""])

      }
    )
    // .subscribe(
    //   (result) => console.log("l'erreur est : ", result)

  }

}

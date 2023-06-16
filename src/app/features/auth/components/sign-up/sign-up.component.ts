import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserDatas, UserDatasSignUp } from 'src/app/shared/constantes/constantes';
import { Observable, Unsubscribable, of } from 'rxjs';
import { createUser } from '../../store/user.actions';
import { getRequestErrorMessage } from '../../store/user.selector';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent implements OnDestroy {
  signUpForm: FormGroup;
  // requestErroMessage: Observable<string | undefined> = this.store.select(getRequestErrorMessage)
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

    // this.createUser = this.authService.createUser(this.userData)
  }

  changeCheckedState() {
    this.check = !this.check
  }

  onInput() {
    // this.requestErroMessage = of("")
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
    // this.subscription.unsubscribe()
  }

  onSubmit(type?: string) {
    if (this.signUpForm.valid) {
      let name = this.signUpForm.get('username')?.value
      let email = this.signUpForm.get('email')?.value
      let password = this.signUpForm.get('password')?.value
      console.log("top user dispatvc");
      this.store.dispatch(createUser({ userDatas: { name, email, password } }))
      // this.createUser.subscribe(
      //   {
      //     next: (response) => {
      //       this.userCreated = true
      //       const res = response as UserDatas
      //       this.authService.saveUserDatas(res.name, res.email, res.token)
      //       this.router.navigate(["/dashboard"])
      //     },
      //     error: (error) => {
      //       if (error instanceof HttpErrorResponse) {
      //         if (error.status == 401) {
      //           this.emailAlreadyExistError = error.error.message
      //         } else if (error.status == 400) {
      //           this.emailAlreadyExistError = error.error.message
      //         } else {
      //           this.requestErroMessage = error.error.message
      //         }
      //       }
      //     },
      //     complete: () => { }
      //   }
      // )
    }
  }

}

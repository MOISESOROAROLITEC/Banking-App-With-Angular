import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as userActions from './user.actions';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class UserEffects {

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser.type),
      exhaustMap(({ userDatas }) => this.userService.createUser(userDatas)
        .pipe(
          tap((res) => console.log("le reponse serveur : ", res)),
          map((response) => {
            localStorage.setItem("name", response.name);
            localStorage.setItem("email", response.email);
            if (response.token) {
              localStorage.setItem("token", response.token);
            }
            this.router.navigate(['/dashboard'])
            return ({ type: userActions.createUserSuccess.type, payload: response })
          }),
          catchError((error) => {
            this.toast.success(error.error.message)
            return of({ type: userActions.createUserFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private userService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) { }

}

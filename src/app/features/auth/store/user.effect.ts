import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as userActions from './user.actions';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserSharedService } from 'src/app/shared/services/user.shared.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';

@Injectable()
export class UserEffects {

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser.type),
      exhaustMap(({ userDatas }) => this.userService.createUser(userDatas)
        .pipe(
          map((response) => {
            if (response.token) {
              localStorage.setItem("token", response.token);
            }
            if (response.role !== "admin") {
              this.router.navigate(['/dashboard'])
            } else {
              this.router.navigate(['/admin'])
            }
            return ({ type: userActions.createUserSuccess.type, userDatas: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: userActions.createUserFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  getUserInformationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserInformationsAction.type),
      exhaustMap(() => this.userSharedService.getUserInformations()
        .pipe(
          map((response) => {
            if (response.token) {
              localStorage.setItem('token', response.token)
            }
            return ({ type: userActions.getUserInformationsSucceed.type, userDatas: response })
          }),
          catchError((error) => {
            if (error.status === 401 || error.status === 404) {
              localStorage.removeItem('token')
              this.router.navigate(["auth/login"])
            }
            return of({ type: userActions.getUserInformationsFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginUser.type),
      exhaustMap(({ loginDatas }) => this.userService.loginUser(loginDatas)
        .pipe(
          map((response) => {
            if (response.token) {
              localStorage.setItem("token", response.token);
            }
            if (response.role !== "admin") {
              this.router.navigate(['/dashboard'])
            } else {
              this.router.navigate(['/admin'])
            }
            return ({ type: userActions.loginUserSuccess.type, userDatas: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: userActions.loginUserFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  updateUserInformationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserInformationsAction.type),
      exhaustMap(({ data }) => this.dashboardService.editUserDatas(data)
        .pipe(
          map((response) => {
            console.log('le nouveau token est : ', response.token);
            if (response.token) {
              localStorage.setItem('token', response.token)
            }
            this.toast.success("Mise à jour éffectué avec succès")
            return ({ type: userActions.updateUserInformationsSucceed.type, userDatas: response })
          }),
          catchError((error) => {
            this.toast.error(error.error.message)
            return of({ type: userActions.updateUserInformationsFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  resetPasswordVerifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.resetPasswordVerifyEmail.type),
      exhaustMap(({ email }) => this.userService.resetPasswordVerifyEmail(email)
        .pipe(
          map((response) => {
            localStorage.setItem("reset-token", response.token);
            this.router.navigate(['/auth/reset-password/new-password'])
            return ({ type: userActions.resetPasswordVerifyEmailSuccess.type, token: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: userActions.resetPasswordVerifyEmailFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  resetPasswordChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.resetPasswordNewPassword.type),
      exhaustMap(({ password }) => this.userService.resetPasswordNewPassword(password)
        .pipe(
          map((response) => {
            localStorage.removeItem('reset-token');
            this.router.navigate(['/auth/reset-password/success'])
            return ({ type: userActions.resetPasswordNewPasswordSuccess.type, message: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: userActions.resetPasswordNewPasswordFailed.type, message: error.error.message })
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
    private userSharedService: UserSharedService,
    private readonly dashboardService: DashboardService
  ) { }

}

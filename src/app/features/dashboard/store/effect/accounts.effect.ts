import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import {
  getUserAccountsAction,
  getUserAccountsSucceed,
  getUserAccountsFailed,
  createSaveAccountAction,
  createSaveAccountSucceed,
  createSaveAccountFailed,
  createBlockedAccountAction,
  createBlockedAccountSucceed,
  createBlockedAccountFailed,
} from '../actions/accounts.actions';

@Injectable()
export class DashboardEffects {
  getUserAccountsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAccountsAction.type),
      exhaustMap(() => this.dashboardService.getUserAccounts()
        .pipe(
          map((response) => {
            return ({ type: getUserAccountsSucceed.type, userAccounts: response })
          }),
          catchError((error) => {
            this.toast.error(error.error.message)
            return of({ type: getUserAccountsFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  createSaveAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSaveAccountAction.type),
      exhaustMap(({ parentIban }) => this.dashboardService.createSaveAccounts(parentIban)
        .pipe(
          map((response) => {
            return ({ type: createSaveAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            this.toast.error(error.error.message)
            return of({ type: createSaveAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  createBlockedAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBlockedAccountAction.type),
      exhaustMap(({ parentIban }) => this.dashboardService.createBlockedAccounts(parentIban)
        .pipe(
          map((response) => {
            return ({ type: createBlockedAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            this.toast.error(error.error.message)
            return of({ type: createBlockedAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private toast: ToastService,
  ) { }

}

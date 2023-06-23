import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { DashboardService } from '../../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import * as accountsActions from '../actions/accounts.actions';

@Injectable()
export class DashboardEffects {
  getUserAccountsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.getUserAccountsAction.type),
      exhaustMap(() => this.dashboardService.getUserAccounts()
        .pipe(
          map((response) => {
            return ({ type: accountsActions.getUserAccountsSucceed.type, userAccounts: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: accountsActions.getUserAccountsFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  createSaveAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.createSaveAccountAction.type),
      exhaustMap(({ parentIban }) => this.dashboardService.createSaveAccounts(parentIban)
        .pipe(
          map((response) => {
            this.store.dispatch(accountsActions.getUserAccountsAction());
            return ({ type: accountsActions.createSaveAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: accountsActions.createSaveAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  createBlockedAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.createBlockedAccountAction.type),
      exhaustMap(({ parentIban }) => this.dashboardService.createBlockedAccounts(parentIban)
        .pipe(
          map((response) => {
            this.store.dispatch(accountsActions.getUserAccountsAction());
            return ({ type: accountsActions.createBlockedAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: accountsActions.createBlockedAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  blockAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.blockAccountAction.type),
      exhaustMap(({ accountIban }) => this.dashboardService.blockAccount(accountIban)
        .pipe(
          map((response) => {
            this.store.dispatch(accountsActions.getUserAccountsAction());
            return ({ type: accountsActions.blockAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: accountsActions.blockAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  deblockAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.deblockAccountAction.type),
      exhaustMap(({ accountIban }) => this.dashboardService.deblockAccount(accountIban)
        .pipe(
          map((response) => {
            this.store.dispatch(accountsActions.getUserAccountsAction());
            return ({ type: accountsActions.deblockAccountSucceed.type, subAccount: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: accountsActions.deblockAccountFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private toast: ToastService,
    private store: Store
  ) { }

}

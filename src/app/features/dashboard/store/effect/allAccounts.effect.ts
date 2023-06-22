import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { getAllAccountsAction, getAllAccountsFailed, getAllAccountsSucceed, getAllSubAccountsAction, getAllSubAccountsFailed, getAllSubAccountsSucceed } from '../actions/allAccounts.action';

@Injectable()
export class AccountAndSubAccountEffects {
  getAllAccountsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllAccountsAction.type),
      exhaustMap(() => this.dashboardService.getAllAccounts()
        .pipe(
          map((response) => {
            return ({ type: getAllAccountsSucceed.type, allAccounts: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: getAllAccountsFailed.type })
          })
        )
      )
    )
  )

  getAllSubAccountsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllSubAccountsAction.type),
      exhaustMap(() => this.dashboardService.getAllSubAccounts()
        .pipe(
          map((response) => {
            return ({ type: getAllSubAccountsSucceed.type, allSubAccounts: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: getAllSubAccountsFailed.type })
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
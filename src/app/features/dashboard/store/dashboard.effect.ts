import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import {
  getUserAccountsAction,
  getUserAccountsSucceed,
  getUserAccountsFailed
} from './dashboard.actions';

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

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private toast: ToastService,
  ) { }

}

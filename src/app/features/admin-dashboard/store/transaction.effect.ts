import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as transactionsActions from './transaction.actions'
import { of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminEffects {

  getAllUsersTransactionsUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionsActions.getUsersTransactionsAction.type),
      exhaustMap(() => this.adminServices.getUsersTransactions()
        .pipe(
          map((response) => {
            return ({ type: transactionsActions.getUsersTransactionsSucceed.type, usersTransactions: response })
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message)
            } else {
              this.toast.error("Impossible de contacter le serveur")
            }
            return of({ type: transactionsActions.getUsersTransactionsFailed.type })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private adminServices: AdminService,
    private router: Router,
    private toast: ToastService,
  ) { }

}

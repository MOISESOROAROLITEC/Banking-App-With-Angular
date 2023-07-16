import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as transactionsActions from './transaction.actions';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AdminService } from '../services/admin.service';
import { getAdminTransactionsFilterSelector } from './transaction.selectors';

@Injectable()
export class AdminEffects {
  getAllUsersTransactionsUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionsActions.getUsersTransactionsAction.type),
      exhaustMap(({ transactionsFilter }) =>
        this.adminServices.getUsersTransactions(transactionsFilter).pipe(
          map((response) => {
            return {
              type: transactionsActions.getUsersTransactionsSucceed.type,
              usersTransactions: response,
            };
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message);
            } else {
              this.toast.error('Impossible de contacter le serveur');
            }
            return of({
              type: transactionsActions.getUsersTransactionsFailed.type,
            });
          })
        )
      )
    )
  );

  rejectTransactionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionsActions.rejectTransactionAction),
      withLatestFrom(this.store.select(getAdminTransactionsFilterSelector)),
      exhaustMap(([{ id }, transactionsFilter]) =>
        this.adminServices.rejectTransaction(id).pipe(
          mergeMap(() => {
            return [
              transactionsActions.rejectTransactionSucceed(),
              transactionsActions.getUsersTransactionsAction({
                transactionsFilter,
              }),
            ];
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message);
            } else {
              this.toast.error('Impossible de contacter le serveur');
            }
            return of({
              type: transactionsActions.rejectTransactionFaile.type,
            });
          })
        )
      )
    )
  );

  accepteTransactionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionsActions.accepteTransactionAction.type),
      withLatestFrom(this.store.select(getAdminTransactionsFilterSelector)),
      exhaustMap(([{ id }, transactionsFilter]) =>
        this.adminServices.accepteTransaction(id).pipe(
          map(() => {
            this.store.dispatch(
              transactionsActions.getUsersTransactionsAction({
                transactionsFilter,
              })
            );
            return { type: transactionsActions.accepteTransactionSucceed.type };
          }),
          catchError((error) => {
            if (error.error.message) {
              this.toast.error(error.error.message);
            } else {
              this.toast.error('Impossible de contacter le serveur');
            }
            return of({
              type: transactionsActions.accepteTransactionFaile.type,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminServices: AdminService,
    private store: Store,
    private toast: ToastService
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as transactionsActions from './transaction.actions'
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

	rejectTransactionEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(transactionsActions.rejectTransactionAction.type),
			exhaustMap(({ id }) => this.adminServices.rejectTransaction(id)
				.pipe(
					map(() => {
						this.store.dispatch(transactionsActions.getUsersTransactionsAction())
						return ({ type: transactionsActions.rejectTransactionSucceed.type })
					}),
					catchError((error) => {
						if (error.error.message) {
							this.toast.error(error.error.message)
						} else {
							this.toast.error("Impossible de contacter le serveur")
						}
						return of({ type: transactionsActions.rejectTransactionFaile.type })
					})
				)
			)
		)
	)


	accepteTransactionEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(transactionsActions.accepteTransactionAction.type),
			exhaustMap(({ id }) => this.adminServices.accepteTransaction(id)
				.pipe(
					map(() => {
						this.store.dispatch(transactionsActions.getUsersTransactionsAction())
						return ({ type: transactionsActions.accepteTransactionSucceed.type })
					}),
					catchError((error) => {
						if (error.error.message) {
							this.toast.error(error.error.message)
						} else {
							this.toast.error("Impossible de contacter le serveur")
						}
						return of({ type: transactionsActions.accepteTransactionFaile.type })
					})
				)
			)
		)
	)

	constructor(
		private actions$: Actions,
		private adminServices: AdminService,
		private store: Store,
		private toast: ToastService,
	) { }

}

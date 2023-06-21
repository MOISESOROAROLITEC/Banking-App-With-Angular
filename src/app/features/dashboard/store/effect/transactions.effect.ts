import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import {
	getUserTransactionsAction,
	getUserTransactionsSucceed,
	getUserTransactionsFailed
} from '../actions/transactions.actions';

@Injectable()
export class TransactionEffects {

	getUserTransactionsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getUserTransactionsAction.type),
			exhaustMap(() => this.dashboardService.getUserTransactions()
				.pipe(
					map((response) => {
						console.log("dans effect : ", response);
						return ({ type: getUserTransactionsSucceed.type, transactions: response })
					}),
					catchError((error) => {
						this.toast.error(error.error.message)
						return of({ type: getUserTransactionsFailed.type, message: error.error.message })
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

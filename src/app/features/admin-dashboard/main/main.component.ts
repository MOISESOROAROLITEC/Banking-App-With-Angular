import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminTransactions } from 'src/app/shared/constantes/constantes';
import { accepteTransactionAction, getUsersTransactionsAction, rejectTransactionAction } from '../store/transaction.actions';
import { getUsersTransactionsSelector } from '../store/transaction.selectors';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	displayedColumns: string[] = ["subAccountIban", "transactionType", "amount", "reciver", "createAt", "status", "accountReciver"];
	userTransactions$: Observable<AdminTransactions[] | undefined>;
	datasources: any
	constructor(
		private store: Store
	) {
		this.store.dispatch(getUsersTransactionsAction());
		this.userTransactions$ = this.store.select(getUsersTransactionsSelector)
	}

	ngOnInit() {
		this.userTransactions$.subscribe(
			{
				next: (value) => {
					this.datasources = value
				}
			}
		)
	}

	accepteTransaction(id: number) {
		this.store.dispatch(accepteTransactionAction({ id: id }))
	}

	rejectTransaction(id: number) {
		this.store.dispatch(rejectTransactionAction({ id: id }))
	}

}

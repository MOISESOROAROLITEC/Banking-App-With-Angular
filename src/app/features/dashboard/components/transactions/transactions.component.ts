import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction, UserTransactions } from 'src/app/shared/constantes/constantes';
import { getUserTransactionsSelector } from '../../store/selector/transaction.selector';
import { getUserTransactionsAction } from '../../store/actions/transactions.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ["subAccountIban", "accountEmmiterIban", "transactionType", "amount", "reciver.name", "createAt",];
  userTransactions$: Observable<Transaction[] | undefined>;
  datasources: any

  constructor(
    private store: Store<UserTransactions>,
  ) {
    this.userTransactions$ = this.store.select(getUserTransactionsSelector)
  }

  ngOnInit() {
    this.store.dispatch(getUserTransactionsAction())
    this.userTransactions$.subscribe({
      next: (value) => {
        console.log("la valeur est : ", value);
        this.datasources = value
      }
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}

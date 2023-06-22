import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminTransactions, Transaction } from 'src/app/shared/constantes/constantes';
import { getUsersTransactionsAction } from '../store/transaction.actions';
import { getUsersTransactionsSelector } from '../store/transaction.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ["subAccountIban", "transactionType", "amount", "reciver.name", "createAt", "status"];
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
        next: (value) => this.datasources = value
      }
    )
  }

}

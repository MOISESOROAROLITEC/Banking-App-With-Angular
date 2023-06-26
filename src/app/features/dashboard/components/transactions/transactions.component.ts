import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Transaction, TransactionsFilter, UserTransactions } from 'src/app/shared/constantes/constantes';
import { getUserTransactionsSelector } from '../../store/selector/transaction.selector';
import { getUserTransactionsAction } from '../../store/actions/transactions.actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["subAccountIban", "transactionType", "amount", "reciver.name", "createAt", "status"];
  userTransactions$: Observable<Transaction[] | undefined>;
  datasources: any
  transactionFilter: TransactionsFilter = {
    status: undefined,
    typeOfAccount: undefined,
    transactionDate: undefined,
    reciverNameOrAmount: undefined
  }
  subscribetrans: Subscription

  constructor(
    private store: Store<UserTransactions>,
    private router: Router,
  ) {
    this.userTransactions$ = this.store.select(getUserTransactionsSelector)
    this.subscribetrans = this.userTransactions$.subscribe({
      next: (value) => {
        this.datasources = value
      }
    })
  }
  ngOnInit() {
    this.store.dispatch(getUserTransactionsAction({ transactionsFilter: this.transactionFilter }))
  }

  ngOnDestroy() {
    this.subscribetrans.unsubscribe()
  }

  filterStatus(event: MatSelectChange) {
    const selectedValue = event.value
    this.transactionFilter = { ...this.transactionFilter, status: selectedValue }
    this.store.dispatch(getUserTransactionsAction({ transactionsFilter: this.transactionFilter }))
  }

  filterAccountType(event: MatSelectChange) {
    const selectedValue = event.value
    this.transactionFilter = { ...this.transactionFilter, typeOfAccount: selectedValue }
    this.store.dispatch(getUserTransactionsAction({ transactionsFilter: this.transactionFilter }))
  }


  doTransfert() {
    this.router.navigate(["/dashboard/transfert"])
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}

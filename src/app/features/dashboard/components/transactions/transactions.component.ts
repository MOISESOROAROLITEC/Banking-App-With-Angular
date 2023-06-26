import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { getUserTransactionsSelector } from '../../store/selector/transaction.selector';
import { getUserTransactionsAction } from '../../store/actions/transactions.actions';
import { MatSelectChange } from '@angular/material/select';
import { Transaction, TransactionsFilter, UserTransactions } from '../../store/constantes';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["subAccountIban", "transactionType", "amount", "reciver.name", "createAt", "status"];
  userTransactions$: Observable<Transaction[] | undefined>;
  datasources: any
  subscribetrans: Subscription

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];

  transactionFilter: TransactionsFilter = {
    status: undefined,
    typeOfAccount: undefined,
    transactionDate: undefined,
    reciverNameOrAmount: undefined,
    pageSize: 20,
    currentPage: 1,
  }

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

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  doTransfert() {
    this.router.navigate(["/dashboard/transfert"])
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}

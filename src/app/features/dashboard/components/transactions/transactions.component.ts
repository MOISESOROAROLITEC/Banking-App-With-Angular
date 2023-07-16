import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { getUserTransactionsSelector } from '../../store/selector/transaction.selector';
import { getUserTransactionsAction } from '../../store/actions/transactions.actions';
import { MatSelectChange } from '@angular/material/select';
import { TransactionsFilter, UserTransactions } from '../../store/constantes';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'subAccountIban',
    'transactionType',
    'amount',
    'reciver.name',
    'createAt',
    'status',
  ];
  userTransactions$: Observable<UserTransactions | undefined>;
  datasources: any;
  subscribetrans: Subscription;

  length = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 50];

  transactionFilter: TransactionsFilter = {
    take: this.pageSize,
    skip: 0,
  };

  constructor(private store: Store<UserTransactions>, private router: Router) {
    this.userTransactions$ = this.store.select(getUserTransactionsSelector);
    this.subscribetrans = this.userTransactions$.subscribe({
      next: (value) => {
        if (value) {
          this.datasources = value.transactions;
          this.length = value.totalRecords;
        }
      },
    });
  }
  ngOnInit() {
    this.store.dispatch(
      getUserTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  ngOnDestroy() {
    this.subscribetrans.unsubscribe();
  }

  filterStatus(event: MatSelectChange) {
    const selectedValue = event.value;
    this.currentPage = 0;
    this.transactionFilter = {
      ...this.transactionFilter,
      status: selectedValue,
      skip: 0,
    };
    this.store.dispatch(
      getUserTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  filterAccountType(event: MatSelectChange) {
    const selectedValue = event.value;
    this.currentPage = 0;
    this.transactionFilter = {
      ...this.transactionFilter,
      typeOfAccount: selectedValue,
      skip: 0,
    };
    this.store.dispatch(
      getUserTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  filterTransactionsByDate(event: Event) {}

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex;
    this.transactionFilter = {
      ...this.transactionFilter,
      take: this.pageSize,
      skip: this.currentPage * this.pageSize,
    };

    this.store.dispatch(
      getUserTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  doTransfert() {
    this.router.navigate(['/dashboard/transfert']);
  }

  doRecharge() {
    this.router.navigate(['/dashboard/recharge']);
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  accepteTransactionAction,
  getUsersTransactionsAction,
  rejectTransactionAction,
} from '../store/transaction.actions';
import { getUsersTransactionsSelector } from '../store/transaction.selectors';
import {
  AllTransactions,
  TransactionsFilter,
} from '../../dashboard/store/constantes';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = [
    'subAccountIban',
    'transactionType',
    'amount',
    'reciver',
    'createAt',
    'status',
    'accountReciver',
  ];
  userTransactions$: Observable<AllTransactions | undefined>;
  datasources: any;

  length = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 50];

  transactionFilter: TransactionsFilter = {
    take: this.pageSize,
    skip: 0,
  };

  constructor(private store: Store) {
    this.store.dispatch(
      getUsersTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
    this.userTransactions$ = this.store.select(getUsersTransactionsSelector);
  }

  ngOnInit() {
    this.userTransactions$.subscribe({
      next: (value) => {
        if (value) {
          this.length = value.totalRecords;
          this.datasources = value.transactions;
        }
      },
    });
  }

  filterStatus(event: MatSelectChange) {
    const selectedValue = event.value;
    this.transactionFilter = {
      ...this.transactionFilter,
      status: selectedValue,
    };
    this.store.dispatch(
      getUsersTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  filterAccountType(event: MatSelectChange) {
    const selectedValue = event.value;
    this.transactionFilter = {
      ...this.transactionFilter,
      typeOfAccount: selectedValue,
    };
    this.store.dispatch(
      getUsersTransactionsAction({ transactionsFilter: this.transactionFilter })
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
      getUsersTransactionsAction({ transactionsFilter: this.transactionFilter })
    );
  }

  accepteTransaction(id: number) {
    this.store.dispatch(accepteTransactionAction({ id: id }));
  }

  rejectTransaction(id: number) {
    this.store.dispatch(rejectTransactionAction({ id: id }));
  }
}

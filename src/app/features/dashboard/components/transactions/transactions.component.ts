import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction, UserTransactions } from 'src/app/shared/constantes/constantes';
import { getUserTransactionsSelector } from '../../store/selector/transaction.selector';
import { getUserTransactionsAction } from '../../store/actions/transactions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ["subAccountIban", "transactionType", "amount", "reciver.name", "createAt", "status"];
  userTransactions$: Observable<Transaction[] | undefined>;
  datasources: any

  constructor(
    private store: Store<UserTransactions>,
    private router: Router,
  ) {
    this.userTransactions$ = this.store.select(getUserTransactionsSelector)
  }

  ngOnInit() {
    this.store.dispatch(getUserTransactionsAction())
    this.userTransactions$.subscribe({
      next: (value) => {
        this.datasources = value
      }
    })
  }

  doTransfert() {
    this.router.navigate(["/dashboard/transfert"])
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}

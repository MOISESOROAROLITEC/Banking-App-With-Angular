import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take, tap } from 'rxjs';
import { Account, SubAccount, UserAccounts } from 'src/app/shared/constantes/constantes';
import { getUserAccount, getUserAccounts, getUserAllAccounts, getUserSubAccount } from '../../store/selector/accounts.selector';
import { getAllAccountsSelector } from '../../store/selector/allAccounts.selector';
import { getUserAccountsAction } from '../../store/actions/accounts.actions';
import { getAllAccountsAction, getAllSubAccountsAction } from '../../store/actions/allAccounts.action';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss']
})
export class TransfertComponent implements OnInit {
  allAccounts: Observable<Account[]>
  allSubAccounts: Observable<SubAccount[]>
  accountSelected: Account | SubAccount | undefined

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(getAllAccountsAction())
    this.store.dispatch(getAllSubAccountsAction())
    this.allAccounts = this.store.select(getAllAccountsSelector).pipe(
      map((value) => {
        return [...Object.values(value)]
      })
    )
    this.allSubAccounts = this.store.select(getUserSubAccount).pipe(
      map((value) => {
        return [...Object.values(value)]
      })
    )
  }

  ngOnInit() {
    this.allAccounts.subscribe(
      {
        next: (value) => {
          console.log(value);
          this.accountSelected = value[0]
        }
      }
    )
    this.allSubAccounts.subscribe(
      {
        next: (value) => {
          console.log(value);
          this.accountSelected = value[0]
        }
      }
    )
  }

  selectAccount(account: Account | SubAccount) {
    console.log("le select : ", account);
  }

}

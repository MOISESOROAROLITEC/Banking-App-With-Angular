import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserDatas, getUserFirstName, getUserInitial, getUserLastNames } from 'src/app/features/auth/store/user.selector';
import { Account, SubAccount, UserAccounts, UserDatas } from 'src/app/shared/constantes/constantes';
import { getUserAccount, getUserAccounts, getUserSubAccounts } from '../../store/selector/accounts.selector';
import { createBlockedAccountAction, createSaveAccountAction, getUserAccountsAction } from '../../store/actions/accounts.actions';
import { UserSharedService } from 'src/app/shared/services/user.shared.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userDatas$: Observable<UserDatas>
  userInitial$: Observable<string>
  firstName$: Observable<string>
  lastNames$: Observable<string>
  userAccounts$: Observable<UserAccounts>
  userAccount$: Observable<Account>
  userSubAccount$: Observable<Array<SubAccount>>
  vieuxSold: boolean = true

  constructor(
    private store: Store<UserDatas>,
    private userSharedService: UserSharedService
  ) {
    this.store.dispatch(getUserAccountsAction());
    this.userDatas$ = this.store.select(getUserDatas);
    this.userInitial$ = this.store.select(getUserInitial);
    this.firstName$ = this.store.select(getUserFirstName);
    this.lastNames$ = this.store.select(getUserLastNames);
    this.userAccounts$ = this.store.select(getUserAccounts);
    this.userAccount$ = this.store.select(getUserAccount);
    this.userSubAccount$ = this.store.select(getUserSubAccounts);
  }

  ngOnInit() {
  }

  createSaveAccount(iban: string) {
    this.store.dispatch(createSaveAccountAction({ parentIban: iban }))
  }
  createBlockedAccount(iban: string) {
    this.store.dispatch(createBlockedAccountAction({ parentIban: iban }))
  }

  onDisconnect() {
    this.userSharedService.disconnectUser()
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserDatas, getUserFirstName, getUserInitial, getUserLastNames } from 'src/app/features/auth/store/user.selector';
import { Account, UserAccounts, UserDatas } from 'src/app/shared/constantes/constantes';
import { getUserAccount, getUserAccounts, getUserSubAccount } from '../../store/dashboard.selector';
import { getUserAccountsAction } from '../../store/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';



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
  userSubAccount$: Observable<Array<Account>>

  constructor(
    private store: Store<UserDatas>,
    private dashboardService: DashboardService
  ) {
    this.userDatas$ = this.store.select(getUserDatas)
    this.userInitial$ = this.store.select(getUserInitial)
    this.firstName$ = this.store.select(getUserFirstName)
    this.lastNames$ = this.store.select(getUserLastNames)
    this.userAccounts$ = this.store.select(getUserAccounts)
    this.userAccount$ = this.store.select(getUserAccount)
    this.userSubAccount$ = this.store.select(getUserSubAccount)
  }

  ngOnInit() {
    this.store.dispatch(getUserAccountsAction());
  }

  onDisconnect() {
    this.dashboardService.disconnectUser()
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubAccount } from 'src/app/shared/constantes/constantes';
import { blockAccountAction, deblockAccountAction } from '../../store/actions/accounts.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() subAccountInput!: SubAccount;
  vieuxSold: boolean = true
  subAccount!: SubAccount

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.subAccount = this.subAccountInput
  }

  deblockAccount(iban: string) {
    this.store.dispatch(deblockAccountAction({ accountIban: iban }))
  }

  blockAccount(iban: string) {
    this.store.dispatch(blockAccountAction({ accountIban: iban }))
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, merge, mergeAll, mergeMap, take, tap } from 'rxjs';
import { Account, SubAccount, UserAccounts } from 'src/app/shared/constantes/constantes';
import { getUserAccount, getUserAccounts, getUserAllAccounts, getUserSubAccounts } from '../../store/selector/accounts.selector';
import { getAllAccountsSelector, getAllSubAccountsSelector } from '../../store/selector/allAccounts.selector';
import { getUserAccountsAction } from '../../store/actions/accounts.actions';
import { getAllAccountsAction, getAllSubAccountsAction } from '../../store/actions/allAccounts.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doTransfertAction } from '../../store/actions/transfert.actions';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss']
})
export class TransfertComponent implements OnInit {

  UserSubAccounts: Observable<SubAccount[]>
  UserAccount: Observable<Account>
  accountSelected: Account | SubAccount | undefined
  transfertForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.transfertForm = this.fb.group({
      reciverAccountNumber: ["", [Validators.required, Validators.pattern("^.{16}$")]],
      ammount: ["", [Validators.required, Validators.min(1)]],
      raison: [""],
    })

    this.UserSubAccounts = this.store.select(getUserSubAccounts)
    this.UserAccount = this.store.select(getUserAccount)

  }

  ngOnInit() {
    this.UserAccount.subscribe({
      next: (value) => this.accountSelected = value
    })
  }

  onInput() { }

  selectAccount(account?: Account | SubAccount) {
    this.accountSelected = account
  }

  onSubmit() {
    if (this.transfertForm.valid) {
      if (!this.accountSelected?.iban || !this.transfertForm.get('reciverAccountNumber')?.value) {
        return
      }
      this.store.dispatch(doTransfertAction(
        {
          transfertData: {
            transactionType: "transfert",
            accountEmmiterIban: this.accountSelected.iban,
            accountReciver: String(this.transfertForm.get('reciverAccountNumber')?.value),
            amount: this.transfertForm.get("ammount")?.value
          }
        }
      ))
    }

  }

}

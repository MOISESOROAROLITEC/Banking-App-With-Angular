import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Account, SubAccount } from 'src/app/shared/constantes/constantes';
import {
  getUserAccount,
  getUserSubAccounts,
} from '../../store/selector/accounts.selector';
import { doTransfertAction } from '../../store/actions/transfert.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss'],
})
export class TransfertComponent implements OnInit {
  UserSubAccounts: Observable<SubAccount[]>;
  UserAccount: Observable<Account>;
  accountSelected: Account | SubAccount | undefined;
  transfertForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.transfertForm = this.formBuilder.group({
      reciverAccountNumber: [
        '',
        [Validators.required, Validators.pattern('^.{16}$')],
      ],
      ammount: ['', [Validators.required, Validators.min(1)]],
      raison: [''],
    });

    this.UserSubAccounts = this.store.select(getUserSubAccounts);
    this.UserAccount = this.store.select(getUserAccount);
  }

  ngOnInit() {
    this.UserAccount.subscribe({
      next: (value) => {
        if (!this.accountSelected) this.accountSelected = value;
      },
    });
  }

  selectAccount(account?: Account | SubAccount) {
    this.accountSelected = account;
  }

  onReturnTansaction() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.transfertForm.valid) {
      if (
        !this.accountSelected?.iban ||
        !this.transfertForm.get('reciverAccountNumber')?.value
      ) {
        return;
      }
      this.store.dispatch(
        doTransfertAction({
          transfertData: {
            transactionType: 'transfert',
            accountEmmiterIban: this.accountSelected.iban,
            accountReciver: String(
              this.transfertForm.get('reciverAccountNumber')?.value
            ),
            amount: this.transfertForm.get('ammount')?.value,
          },
        })
      );
    }
  }
}

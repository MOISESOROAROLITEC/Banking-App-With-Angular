import { createReducer, on } from '@ngrx/store';

import { UserAccountsState } from 'src/app/shared/constantes/constantes';
import { getUserAccountsAction, getUserAccountsFailed, getUserAccountsSucceed } from './dashboard.actions';



const initialUserAccountsState: UserAccountsState = {
  account: {
    iban: '',
    type: '',
    balance: 0,
    currency: '',
    bic: '',
  },
  subAccount: [
    {
      iban: '',
      type: '',
      balance: 0,
      currency: '',
      bic: '',
    },
  ],
  loading: false,
};

export const userAccountsReducer = createReducer(
  initialUserAccountsState,
  on(getUserAccountsAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),

  on(getUserAccountsSucceed, (accountsStore, { userAccounts }) => {
    return ({ ...accountsStore, ...userAccounts, loading: false })
  }),

  on(getUserAccountsFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

)

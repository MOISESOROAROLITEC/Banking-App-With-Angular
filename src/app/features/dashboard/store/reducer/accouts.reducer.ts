import { createReducer, on } from '@ngrx/store';

import { UserAccountsState } from 'src/app/shared/constantes/constantes';
import * as accountActions from '../actions/accounts.actions';



const initialUserAccountsState: UserAccountsState = {
  loading: false,
};

export const userAccountsReducer = createReducer(
  initialUserAccountsState,
  on(accountActions.getUserAccountsAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(accountActions.getUserAccountsSucceed, (accountsStore, { userAccounts }) => {
    return ({ ...accountsStore, ...userAccounts, loading: false })
  }),
  on(accountActions.getUserAccountsFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(accountActions.createSaveAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(accountActions.createSaveAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(accountActions.createSaveAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(accountActions.createBlockedAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(accountActions.createBlockedAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(accountActions.createBlockedAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(accountActions.blockAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(accountActions.blockAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(accountActions.blockAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(accountActions.deblockAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(accountActions.deblockAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(accountActions.deblockAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),
)

import { createReducer, on } from '@ngrx/store';

import { UserAccountsState } from 'src/app/shared/constantes/constantes';
import { createBlockedAccountAction, createBlockedAccountFailed, createBlockedAccountSucceed, createSaveAccountAction, createSaveAccountFailed, createSaveAccountSucceed, getUserAccountsAction, getUserAccountsFailed, getUserAccountsSucceed } from '../actions/accounts.actions';



const initialUserAccountsState: UserAccountsState = {
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

  on(createSaveAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(createSaveAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(createSaveAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(createBlockedAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(createBlockedAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(createBlockedAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),
)

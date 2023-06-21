import { createReducer, on } from '@ngrx/store';

import { UserAccountsState } from 'src/app/shared/constantes/constantes';
import { blockAccountAction, blockAccountFailed, blockAccountSucceed, createBlockedAccountAction, createBlockedAccountFailed, createBlockedAccountSucceed, createSaveAccountAction, createSaveAccountFailed, createSaveAccountSucceed, deblockAccountAction, deblockAccountFailed, deblockAccountSucceed, getUserAccountsAction, getUserAccountsFailed, getUserAccountsSucceed } from '../actions/accounts.actions';



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

  on(blockAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(blockAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(blockAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),

  on(deblockAccountAction, (accountsStore) => {
    return ({ ...accountsStore, loading: true })
  }),
  on(deblockAccountSucceed, (accountsStore, { subAccount }) => {
    return ({ ...accountsStore, ...subAccount, loading: false })
  }),
  on(deblockAccountFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),
)

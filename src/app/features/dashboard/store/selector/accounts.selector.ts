import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Account, UserAccounts } from "src/app/shared/constantes/constantes";

export const selectUserAccountsState = createFeatureSelector<UserAccounts>('userAccounts');

export const getUserAccounts = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => state
);

export const getUserAllAccounts = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => {
    return state
  }
);

export const getUserAccount = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => state.account
);

export const getUserSubAccounts = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => {
    return state.subAccount
  }
);

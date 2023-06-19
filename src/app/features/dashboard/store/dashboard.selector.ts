import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAccounts } from "src/app/shared/constantes/constantes";

export const selectUserAccountsState = createFeatureSelector<UserAccounts>('userAccounts');

export const getUserAccounts = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => state
);

export const getUserAccount = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => state.account
);

export const getUserSubAccount = createSelector(
  selectUserAccountsState,
  (state: UserAccounts) => state.subAccount
);

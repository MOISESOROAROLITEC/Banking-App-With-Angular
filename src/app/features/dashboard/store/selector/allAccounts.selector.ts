import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Account, SubAccount } from "src/app/shared/constantes/constantes";

export const selectAllAccountsState = createFeatureSelector<Account[]>('allAccounts');
export const selectAllSubAccountsState = createFeatureSelector<SubAccount[]>('allSubAccounts');

export const getAllAccountsSelector = createSelector(
  selectAllAccountsState,
  (state: Account[]) => state
);

export const getAllSubAccountsSelector = createSelector(
  selectAllSubAccountsState,
  (state: SubAccount[]) => {
    return state
  }
);

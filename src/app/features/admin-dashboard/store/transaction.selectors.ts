import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AllTransactions, UserDatas } from "src/app/shared/constantes/constantes";

export const selectUsersTransactionState = createFeatureSelector<AllTransactions>('usersTransactions');

export const getUsersTransactionsSelector = createSelector(
  selectUsersTransactionState,
  (state: AllTransactions) => state.transactions
);

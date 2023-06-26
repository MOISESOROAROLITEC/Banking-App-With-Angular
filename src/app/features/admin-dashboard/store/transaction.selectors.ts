import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AllTransactions } from "../../dashboard/store/constantes";

export const selectUsersTransactionState = createFeatureSelector<AllTransactions>('usersTransactions');

export const getUsersTransactionsSelector = createSelector(
  selectUsersTransactionState,
  (state: AllTransactions) => state.transactions
);

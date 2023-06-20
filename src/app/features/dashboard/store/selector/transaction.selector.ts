import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserTransactions } from "src/app/shared/constantes/constantes";

export const selectTransactionsState = createFeatureSelector<UserTransactions>('userTransactions');

export const getUserTransactionsSelector = createSelector(
  selectTransactionsState,
  (state: UserTransactions) => state.transactions
);


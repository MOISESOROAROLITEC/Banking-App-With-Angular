import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransfertState, } from "src/app/shared/constantes/constantes";

export const selectTransactionsState = createFeatureSelector<TransfertState>('userTransfert');

export const getUserTransfertStateSelector = createSelector(
  selectTransactionsState,
  (state: TransfertState) => state.transactionState
);

export const getUserTransfertErrorMessageSelector = createSelector(
  selectTransactionsState,
  (state: TransfertState) => state.errorMessage
);

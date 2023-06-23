import { createAction, props } from "@ngrx/store";
import { Transaction } from "src/app/shared/constantes/constantes";

export const getUserTransactionsAction = createAction(
  '[transaction] getUserTransactions',
);
export const getUserTransactionsSucceed = createAction(
  '[transaction] getUserTransactionsSucceed',
  props<{ transactions: Transaction[] }>()
);
export const getUserTransactionsFailed = createAction(
  '[transaction] getUserTransactionsFailed',
  props<{ message: string }>()
);

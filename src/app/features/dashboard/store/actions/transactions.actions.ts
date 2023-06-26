import { createAction, props } from "@ngrx/store";
import { Transaction, TransactionsFilter } from "src/app/shared/constantes/constantes";

export const getUserTransactionsAction = createAction(
  '[transaction] getUserTransactions',
  props<{ transactionsFilter: TransactionsFilter }>()
);
export const getUserTransactionsSucceed = createAction(
  '[transaction] getUserTransactionsSucceed',
  props<{ transactions: Transaction[] }>()
);
export const getUserTransactionsFailed = createAction(
  '[transaction] getUserTransactionsFailed',
  props<{ message: string }>()
);

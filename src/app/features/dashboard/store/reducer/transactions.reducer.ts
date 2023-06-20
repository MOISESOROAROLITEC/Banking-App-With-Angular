import { createReducer, on } from "@ngrx/store";
import { UserTransactionsReducer } from "src/app/shared/constantes/constantes";
import {
  getUserTransactionsAction,
  getUserTransactionsFailed,
  getUserTransactionsSucceed,
} from "../actions/transactions.actions";

const initialTransactionsState: UserTransactionsReducer = {
  loading: false,
}

export const userTransactionsReducer = createReducer(
  initialTransactionsState,
  on(getUserTransactionsAction, (transactionStore) => {
    return ({ ...transactionStore, loading: true })
  }),
  on(getUserTransactionsSucceed, (transactionStore, { transactions }) => {
    return ({ ...transactionStore, transactions: transactions, loading: false })
  }),
  on(getUserTransactionsFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),
)

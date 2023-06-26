import { createReducer, on } from "@ngrx/store";
import {
  getUserTransactionsAction,
  getUserTransactionsFailed,
  getUserTransactionsSucceed,
} from "../actions/transactions.actions";
import { UserTransactionsReducer } from "../constantes";

const initialTransactionsState: UserTransactionsReducer = {
  loading: false,
  totalRecords: 0,
  totalPages: 0,
  currentPage: 0
}

export const userTransactionsReducer = createReducer(
  initialTransactionsState,
  on(getUserTransactionsAction, (transactionStore) => {
    return ({ ...transactionStore, loading: true })
  }),
  on(getUserTransactionsSucceed, (transactionStore, { transactions }) => {
    return ({ ...transactionStore, ...transactions, loading: false })
  }),
  on(getUserTransactionsFailed, (accountsStore, { message }) => {
    return ({ ...accountsStore, loading: false, requestErrorMessage: message })
  }),
)

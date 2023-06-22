import { createReducer, on } from '@ngrx/store';
import { AllTransactionsState } from 'src/app/shared/constantes/constantes';
import {
  getUsersTransactionsAction,
  getUsersTransactionsFailed,
  getUsersTransactionsSucceed
} from './transaction.actions';


const initialUsersTransactionsState: AllTransactionsState = {
  totalPages: 0,
  totalRecords: 0,
  currentPage: 0,
  transactions: [],
  loading: false,
};

export const usersTransactionsReducer = createReducer(
  initialUsersTransactionsState,
  on(getUsersTransactionsAction, (store) => {
    return ({ ...store, loading: true })
  }),
  on(getUsersTransactionsSucceed, (store, { usersTransactions }) => {
    return ({ ...store, ...usersTransactions, loading: false })
  }),
  on(getUsersTransactionsFailed, (user) => {
    return ({ ...user, loading: false, })
  }),
)

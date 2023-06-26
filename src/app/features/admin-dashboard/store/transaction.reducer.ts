import { createReducer, on } from '@ngrx/store';
import {
  getUsersTransactionsAction,
  getUsersTransactionsFailed,
  getUsersTransactionsSucceed
} from './transaction.actions';
import { AllTransactionsState } from '../../dashboard/store/constantes';


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

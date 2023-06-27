import { createReducer, on } from '@ngrx/store';
import {
  getUsersTransactionsAction,
  getUsersTransactionsFailed,
  getUsersTransactionsSucceed,
  updateAdminTransactionFilter,
} from './transaction.actions';
import {
  AllTransactionsState,
  TransactionsFilter,
} from '../../dashboard/store/constantes';

const initialUsersTransactionsState: AllTransactionsState = {
  totalRecords: 0,
  currentPage: 0,
  transactions: [],
  loading: false,
};

export const usersTransactionsReducer = createReducer(
  initialUsersTransactionsState,
  on(getUsersTransactionsAction, (store) => {
    return { ...store, loading: true };
  }),
  on(getUsersTransactionsSucceed, (store, { usersTransactions }) => {
    return { ...store, ...usersTransactions, loading: false };
  }),
  on(getUsersTransactionsFailed, (user) => {
    return { ...user, loading: false };
  })
);

const initialAdminFilter: TransactionsFilter = {
  take: 10,
  skip: 0,
};

export const adminTransactionsFilterReducer = createReducer(
  initialAdminFilter,
  on(updateAdminTransactionFilter, (store, { newFilter }) => {
    return { ...store, ...newFilter };
  })
);

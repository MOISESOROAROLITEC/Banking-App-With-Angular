import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AllTransactions,
  TransactionsFilter,
} from '../../dashboard/store/constantes';

export const selectUsersTransactionState =
  createFeatureSelector<AllTransactions>('usersTransactions');
export const selectAdminFilter =
  createFeatureSelector<TransactionsFilter>('adminFilter');

export const getUsersTransactionsSelector = createSelector(
  selectUsersTransactionState,
  (state: AllTransactions) => state
);

export const getAdminTransactionsFilterSelector = createSelector(
  selectAdminFilter,
  (state: TransactionsFilter) => state
);

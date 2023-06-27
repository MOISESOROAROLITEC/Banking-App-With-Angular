import { createAction, props } from '@ngrx/store';
import {
  AllTransactions,
  TransactionsFilter,
} from '../../dashboard/store/constantes';

export const getUsersTransactionsAction = createAction(
  '[accounts] getUsersTransactions',
  props<{ transactionsFilter: TransactionsFilter }>()
);
export const getUsersTransactionsSucceed = createAction(
  '[accounts] getUsersTransactionsSucceed',
  props<{ usersTransactions: AllTransactions }>()
);
export const getUsersTransactionsFailed = createAction(
  '[accounts] getUsersTransactionsFailed'
);

export const rejectTransactionAction = createAction(
  '[transAction] rejectTransactionAction',
  props<{ id: number }>()
);
export const rejectTransactionSucceed = createAction(
  '[transAction] rejectTransactionSucceed'
);
export const rejectTransactionFaile = createAction(
  '[transAction] rejectTransactionFaile'
);

export const accepteTransactionAction = createAction(
  '[transAction] accepteTransactionAction',
  props<{ id: number }>()
);
export const accepteTransactionSucceed = createAction(
  '[transAction] accepteTransactionSucceed'
);
export const accepteTransactionFaile = createAction(
  '[transAction] accepteTransactionFaile'
);

export const updateAdminTransactionFilter = createAction(
  '[transActionFilter] updateAdminTransactionFilter',
  props<{ newFilter: TransactionsFilter }>()
);

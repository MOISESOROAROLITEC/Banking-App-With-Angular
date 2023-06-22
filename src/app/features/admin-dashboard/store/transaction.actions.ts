import { createAction, props } from '@ngrx/store';
import { AllTransactions } from 'src/app/shared/constantes/constantes';

export const getUsersTransactionsAction = createAction(
  '[accounts] getUsersTransactions',
);
export const getUsersTransactionsSucceed = createAction(
  '[accounts] getUsersTransactionsSucceed',
  props<{ usersTransactions: AllTransactions }>()
);
export const getUsersTransactionsFailed = createAction(
  '[accounts] getUsersTransactionsFailed'
);

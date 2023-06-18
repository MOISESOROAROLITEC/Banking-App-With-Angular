import { createAction, props } from '@ngrx/store';
import { UserAccounts, UserDatas, UserDatasSignUp } from 'src/app/shared/constantes/constantes';

export const getUserAccountsAction = createAction(
  '[accounts] getUserAccounts',
);

export const getUserAccountsSucceed = createAction(
  '[accounts] getUserAccountsSucceed',
  props<{ userAccounts: UserAccounts }>()
);

export const getUserAccountsFailed = createAction(
  '[accounts] getUserAccountsFailed',
  props<{ message: string }>()
);

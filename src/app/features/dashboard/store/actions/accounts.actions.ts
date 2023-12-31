import { createAction, props } from '@ngrx/store';
import { SubAccount, UserAccounts } from 'src/app/shared/constantes/constantes';

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

export const createBlockedAccountAction = createAction(
  '[accounts] createBlockedAccount',
  props<{ parentIban: string }>()
);
export const createBlockedAccountSucceed = createAction(
  '[accounts] createBlockedAccountSucceed',
  props<{ subAccount: SubAccount }>()
);
export const createBlockedAccountFailed = createAction(
  '[accounts] createBlockedAccountFailed',
  props<{ message: string }>()
);

export const createSaveAccountAction = createAction(
  '[subAccount] createSaveAccount',
  props<{ parentIban: string }>()
);
export const createSaveAccountSucceed = createAction(
  '[subAccount] createSaveAccountSucceed',
  props<{ subAccount: SubAccount }>()
);
export const createSaveAccountFailed = createAction(
  '[subAccount] createSaveAccountFailed',
  props<{ message: string }>()
);

export const blockAccountAction = createAction(
  '[subAccount] blockAccountAction',
  props<{ accountIban: string }>()
);
export const blockAccountSucceed = createAction(
  '[subAccount] blockAccountSucceed',
  props<{ subAccount: SubAccount }>()
);
export const blockAccountFailed = createAction(
  '[subAccount] blockAccountFailed',
  props<{ message: string }>()
);

export const deblockAccountAction = createAction(
  '[subAccount] deblockAccount',
  props<{ accountIban: string }>()
);
export const deblockAccountSucceed = createAction(
  '[subAccount] deblockAccountSucceed',
  props<{ subAccount: SubAccount }>()
);
export const deblockAccountFailed = createAction(
  '[subAccount] deblockAccountFailed',
  props<{ message: string }>()
);

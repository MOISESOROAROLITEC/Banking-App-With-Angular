import { createAction, props } from "@ngrx/store";
import { Account, SubAccount } from "src/app/shared/constantes/constantes";

export const getAllAccountsAction = createAction(
  '[Accounts] getAllAccountsAction'
);
export const getAllAccountsSucceed = createAction(
  '[Accounts] getAllAccountsSucceed',
  props<{ allAccounts: Account[] }>()
);
export const getAllAccountsFailed = createAction(
  '[Accounts] getAllAccountsFailed'
);



export const getAllSubAccountsAction = createAction(
  '[SubAccounts] getAllSubAccountsAction'
);
export const getAllSubAccountsSucceed = createAction(
  '[SubAccounts] getAllSubAccountsSucceed',
  props<{ allSubAccounts: SubAccount[] }>()
);
export const getAllSubAccountsFailed = createAction(
  '[SubAccounts] getAllAccountsFailed'
);

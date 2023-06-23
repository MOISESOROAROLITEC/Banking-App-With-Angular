import { createAction, props } from '@ngrx/store';
import { UserDatas } from '../constantes/constantes';

export const getUserInformationsAction = createAction(
  '[user] getUserInformationsAction',
);
export const getUserInformationsSucceed = createAction(
  '[user] getUserInformationsSucceed',
  props<{ userDatas: UserDatas }>()
);
export const getUserInformationsFailed = createAction(
  '[user] getUserInformationsFailed',
  props<{ message: string }>()
);

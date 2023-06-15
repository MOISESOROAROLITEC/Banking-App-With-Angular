import { createAction, props } from '@ngrx/store';
import { UserDatas } from 'src/app/shared/constantes';

export const updateUser = createAction(
  '[User] updateUser',
  props<{ newDatas: UserDatas }>()
);

export const changeUserName = createAction(
  '[User] changeUserName',
  props<{ newName: string }>()
);

export const changeUserEmail = createAction(
  '[User] changeUserEmail',
  props<{ newEmail: string }>()
);
export const changeUserToken = createAction(
  '[User] changeUserToken',
  props<{ newToken: string }>()
);

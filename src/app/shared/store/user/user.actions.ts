import { createAction, props } from '@ngrx/store';

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

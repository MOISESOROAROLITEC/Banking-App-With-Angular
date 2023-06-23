import { createAction, props } from '@ngrx/store';
import { UpdateUserDatas, UserDatas, UserDatasLogin, UserDatasSignUp } from 'src/app/shared/constantes/constantes';

export const updateUser = createAction(
  '[User] updateUser',
  props<{ newDatas: UserDatas }>()
);

export const createUser = createAction(
  '[User] createUser',
  props<{ userDatas: UserDatasSignUp }>()
);
export const createUserFailed = createAction(
  '[User] createUserFailed',
  props<{ message: string }>()
);
export const createUserSuccess = createAction(
  '[User] createUserSuccess',
  props<{ userDatas: UserDatas }>()
);

export const loginUser = createAction(
  '[User] loginUser',
  props<{ loginDatas: UserDatasLogin }>()
);
export const loginUserFailed = createAction(
  '[User] loginUserFailed',
  props<{ message: string }>()
);
export const loginUserSuccess = createAction(
  '[User] loginUserSuccess',
  props<{ userDatas: UserDatas }>()
);

export const resetPasswordVerifyEmail = createAction(
  '[User] resetPasswordVerifyEmail',
  props<{ email: string }>()
);
export const resetPasswordVerifyEmailFailed = createAction(
  '[User] resetPasswordVerifyEmailFailed',
  props<{ message: string }>()
);
export const resetPasswordVerifyEmailSuccess = createAction(
  '[User] resetPasswordVerifyEmailSuccess',
  props<{ token: string }>()
);

export const resetPasswordNewPassword = createAction(
  '[User] resetPasswordNewPassword',
  props<{ password: string }>()
);
export const resetPasswordNewPasswordFailed = createAction(
  '[User] resetPasswordNewPasswordFailed',
  props<{ message: string }>()
);
export const resetPasswordNewPasswordSuccess = createAction(
  '[User] resetPasswordNewPasswordSuccess'
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

export const updateUserInformationsAction = createAction(
  '[user] updateUserInformationsAction',
  props<{ data: UpdateUserDatas }>()
);
export const updateUserInformationsSucceed = createAction(
  '[user] updateUserInformationsSucceed',
  props<{ userDatas: UserDatas }>()
);
export const updateUserInformationsFailed = createAction(
  '[user] updateUserInformationsFailed',
  props<{ message: string }>()
);

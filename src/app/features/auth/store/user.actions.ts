import { createAction, props } from '@ngrx/store';
import { UserDatas, UserDatasSignUp } from 'src/app/shared/constantes/constantes';

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

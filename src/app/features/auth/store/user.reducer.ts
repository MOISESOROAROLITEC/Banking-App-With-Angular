import { createReducer, on } from '@ngrx/store';

import { UserDatasStore } from 'src/app/shared/constantes/constantes';
import { changeUserEmail, changeUserName, changeUserToken, createUser, createUserFailed, createUserSuccess, loginUser, loginUserFailed, loginUserSuccess, updateUser } from './user.actions';

const initialUserState: UserDatasStore = {
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  loading: false,

};

export const userReducer = createReducer(
  initialUserState,
  on(createUser, (user) => {
    return ({ ...user, loading: true })
  }),
  on(createUserSuccess, (user, { userDatas }) => {
    return ({ ...user, ...userDatas, loading: false })
  }),
  on(createUserFailed, (user, { message }) => {
    return ({ ...user, loading: false, requestErrorMessage: message })
  }),

  on(loginUser, (user) => {
    return ({ ...user, loading: true })
  }),
  on(loginUserSuccess, (user, { userDatas }) => {
    return ({ ...user, ...userDatas, loading: false })
  }),
  on(loginUserFailed, (user, { message }) => {
    return ({ ...user, loading: false, requestErrorMessage: message })
  }),

  on(updateUser, (user, { newDatas }) => {
    localStorage.setItem("username", newDatas.name);
    localStorage.setItem("email", newDatas.email);
    if (newDatas.token) {
      localStorage.setItem("token", newDatas.token);
    }
    return ({ ...user, ...newDatas })
  }),

  on(changeUserName, (user, { newName }) => {
    return ({ ...user, name: newName })
  }),

  on(changeUserEmail, (user, { newEmail }) => {
    localStorage.setItem("email", newEmail)
    return ({ ...user, email: newEmail })
  }),

  on(changeUserToken, (user, { newToken }) => {
    localStorage.setItem("token", newToken)
    return ({ ...user, token: newToken })
  }),
)

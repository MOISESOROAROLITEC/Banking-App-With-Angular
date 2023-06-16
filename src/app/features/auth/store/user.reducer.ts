import { createReducer, on } from '@ngrx/store';

import { UserDatas, UserDatasStore } from 'src/app/shared/constantes/constantes';
import { changeUserEmail, changeUserName, changeUserToken, createUser, createUserFailed, createUserSuccess, updateUser } from './user.actions';

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
    console.log("dans le on messatge: ", message);
    return ({ ...user, loading: false, requestErrorMessage: message })
  }),

  on(updateUser, (user, { newDatas }) => {
    localStorage.setItem("name", newDatas.name);
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

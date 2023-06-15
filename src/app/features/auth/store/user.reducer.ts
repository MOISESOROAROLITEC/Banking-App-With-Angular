import { createFeature, createReducer, on } from '@ngrx/store';

import { UserDatas } from 'src/app/shared/constantes';
import * as actions from './user.actions'
import { updateUser } from './user.actions';

const initialUserState: UserDatas = {
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",

};

export const userReducer = createReducer(
  initialUserState,
  on(updateUser, (user, { newDatas }) => {
    localStorage.setItem("name", newDatas.name);
    localStorage.setItem("email", newDatas.email);
    if (newDatas.token) {
      localStorage.setItem("token", newDatas.token);
    }
    return ({ ...user, ...newDatas })
  }),

  on(actions.changeUserName, (user, { newName }) => {
    // localStorage.setItem("username", newName);
    return ({ ...user, name: newName })
  }),

  on(actions.changeUserEmail, (user, { newEmail }) => {
    localStorage.setItem("email", newEmail)
    return ({ ...user, email: newEmail })
  }),


  on(actions.changeUserToken, (user, { newToken }) => {
    localStorage.setItem("token", newToken)
    return ({ ...user, token: newToken })
  }),
)

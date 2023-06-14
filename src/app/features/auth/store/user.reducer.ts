import { createFeature, createReducer, on } from '@ngrx/store';

import { UserDatas } from 'src/app/shared/constantes';
import * as actions from './user.actions'

const initialState: UserDatas = {
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("emain") || "",
  token: localStorage.getItem("token") || "",

};

export const userReducer = createReducer(
  initialState,
  on(actions.updateUser, (state, { newDatas }) => ({
    ...state,
    ...newDatas
  }))
)

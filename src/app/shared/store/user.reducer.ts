import { createReducer, on } from '@ngrx/store';

import { UserDatasState } from 'src/app/shared/constantes/constantes';
import * as userActions from './user.action';


const initialUserInformationsState: UserDatasState = {
  name: "",
  email: "",
  role: "",
  loading: false,
};

export const userInformationsReducer = createReducer(
  initialUserInformationsState,
  on(userActions.getUserInformationsAction, (store) => {
    return ({ ...store, loading: true })
  }),
  on(userActions.getUserInformationsSucceed, (store, { userDatas }) => {
    return ({ ...store, ...userDatas, loading: false })
  }),
  on(userActions.getUserInformationsFailed, (store) => {
    return ({ ...store, loading: false })
  }),
)

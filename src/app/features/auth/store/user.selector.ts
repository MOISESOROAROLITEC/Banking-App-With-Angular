import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserDatas, UserDatasStore } from "src/app/shared/constantes/constantes";

export const selectUserState = createFeatureSelector<UserDatasStore>('userFeature');

export const getUserName = createSelector(
  selectUserState,
  (state: UserDatas) => state.name
);
export const getUserEmail = createSelector(
  selectUserState,
  (state: UserDatas) => state.email
);

export const getRequestErrorMessage = createSelector(
  selectUserState,
  (state: UserDatasStore) => state.requestErrorMessage
);

export const getUserDatas = createSelector(
  selectUserState,
  (state: UserDatas) => state
);

export const getUserRole = createSelector(
  selectUserState,
  (state: UserDatas) => state.role
);

export const getUserFirstName = createSelector(
  selectUserState,
  (state: UserDatas) => {
    const firstName = state.name.split(' ')[0]
    return firstName
  }
);
export const getUserLastNames = createSelector(
  selectUserState,
  (state: UserDatas) => {
    let lastNames = state.name.split(' ').slice(1)

    return lastNames.join("")
  }
);

export const getUserInitial = createSelector(
  selectUserState,
  (state: UserDatas) => {
    const splitName = state.name.trim().split(" ");

    let userInitial = ''
    for (let i = 0; i < splitName.length; i++) {
      userInitial = userInitial + splitName[i][0]?.toUpperCase();
    }
    return userInitial
  }
);

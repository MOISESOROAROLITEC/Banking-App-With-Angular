import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserDatas } from "src/app/shared/constantes";

export const selectUserState = createFeatureSelector<UserDatas>('userFeature');

export const getUserName = createSelector(
  selectUserState,
  (state: UserDatas) => state.name
);
export const getUserEmail = createSelector(
  selectUserState,
  (state: UserDatas) => state.email
);

export const getUserDatas = createSelector(
  selectUserState,
  (state: UserDatas) => state
);

export const getUserInitial = createSelector(
  selectUserState,
  (state: UserDatas) => {
    const splitName = state.name.split(" ");
    let userInitial = ''
    for (let i = 0; i < splitName.length; i++) {
      userInitial = userInitial + splitName[i][0]?.toUpperCase();
    }
    return userInitial
  }
);

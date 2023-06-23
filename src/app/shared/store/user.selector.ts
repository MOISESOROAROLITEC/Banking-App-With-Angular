import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserDatas } from "src/app/shared/constantes/constantes";

export const selectUserInformationsState = createFeatureSelector<UserDatas>('userInformations');

export const getUserInformationsSelector = createSelector(
  selectUserInformationsState,
  (state: UserDatas) => state
);

export const getUserTokenSelector = createSelector(
  selectUserInformationsState,
  (state: UserDatas) => state.token
);

export const getUserRoleSelector = createSelector(
  selectUserInformationsState,
  (state: UserDatas) => state.role
);

export const getUserNameSelector = createSelector(
  selectUserInformationsState,
  (state: UserDatas) => state.name
);

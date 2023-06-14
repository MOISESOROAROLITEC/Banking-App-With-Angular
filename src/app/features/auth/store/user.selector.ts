import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserDatas } from "src/app/shared/constantes";

export const selectUserState = createFeatureSelector<UserDatas>('userFeature');

export const getUserName = createSelector(
  selectUserState,
  (state: UserDatas) => state.name
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserDatas } from "../../constantes";

export const selectUserState = createFeatureSelector<UserDatas>('user');

export const selectUserName = createSelector(
  selectUserState,
  (state: UserDatas) => state.name
);

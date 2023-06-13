import { createReducer, on } from "@ngrx/store";
import { UserDatas } from "../../constantes";
import { changeUserEmail, changeUserName, changeUserToken } from "./user.actions";

const initialUser: UserDatas = {
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("emain") || "",
  token: localStorage.getItem("token") || "",
}

export const UserReducer = createReducer(
  initialUser,

  on(changeUserName, (user, { newName }) => ({ ...user, name: newName })),
  on(changeUserEmail, (user, { newEmail }) => ({ ...user, name: newEmail })),
  on(changeUserToken, (user, { newToken }) => ({ ...user, name: newToken })),
)

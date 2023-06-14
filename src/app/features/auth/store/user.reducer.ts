import { createFeature, createReducer, on } from "@ngrx/store";
import { changeUserEmail, changeUserName, changeUserToken, updateUser } from "./user.actions";
import { UserDatas } from "src/app/shared/constantes";

const initialUserState: UserDatas = {
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("emain") || "",
  token: localStorage.getItem("token") || "",
}

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

  on(changeUserName, (user, { newName }) => {
    // localStorage.setItem("username", newName);
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

// export const userFeature = createFeature({
//   name: "user",
//   reducer: userReducer,
//   extraSelectors: undefined,
// })

// export const { name, reducer, selectUserState, } = userFeature

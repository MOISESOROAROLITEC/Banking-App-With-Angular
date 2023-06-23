import { createReducer, on } from "@ngrx/store";
import { Account, SubAccount } from "src/app/shared/constantes/constantes";
import { getAllAccountsAction, getAllAccountsFailed, getAllAccountsSucceed, getAllSubAccountsAction, getAllSubAccountsFailed, getAllSubAccountsSucceed } from "../actions/allAccounts.action";

const initialAccountsState: Account[] = [
  {
    iban: "",
    balance: 0,
    currency: "",
    bic: "",
    type: ""
  }
]

export const allAccountsReducer = createReducer(
  initialAccountsState,
  on(getAllAccountsAction, (store) => {
    return ({ ...store })
  }),
  on(getAllAccountsSucceed, (store, { allAccounts }) => {
    return ({ ...store, ...allAccounts })
  }),
  on(getAllAccountsFailed, (store) => {
    return ({ ...store })
  }),
)


const initialSubAccountsState: SubAccount[] = [
  {
    accountParentIban: "",
    iban: "",
    balance: 0,
    currency: "",
    bic: "",
    type: ""
  }
]

export const allSubAccountsReducer = createReducer(
  initialSubAccountsState,
  on(getAllSubAccountsAction, (store) => {
    return ({ ...store })
  }),
  on(getAllSubAccountsSucceed, (store, { allSubAccounts }) => {
    return ({ ...store, ...allSubAccounts })
  }),
  on(getAllSubAccountsFailed, (store) => {
    return ({ ...store })
  }),
)

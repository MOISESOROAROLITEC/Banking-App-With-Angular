import { createReducer, on } from "@ngrx/store";

import { doTransfertFaile, doTransfertSuccess } from "../actions/transfert.actions";
import { TransfertState } from "../constantes";

const initialTransfertState: TransfertState = {
  transactionState: undefined,
  errorMessage: ""
}

export const userTransfertReducer = createReducer(
  initialTransfertState,
  on(doTransfertFaile, (transactionStore) => {
    return ({ ...transactionStore, transactionState: false })
  }),
  on(doTransfertSuccess, (transactionStore) => {
    return ({ ...transactionStore, transactionState: true })
  }),
)

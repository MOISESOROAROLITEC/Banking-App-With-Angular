import { createAction, props } from "@ngrx/store";
import { DoTransfert } from "../constantes";

export const doTransfertAction = createAction(
  '[transfert] doTransfert',
  props<{ transfertData: DoTransfert }>()
);
export const doTransfertSuccess = createAction(
  '[transfert] doTransfertFails',
);
export const doTransfertFaile = createAction(
  '[transfert] doTransfertFails',
);

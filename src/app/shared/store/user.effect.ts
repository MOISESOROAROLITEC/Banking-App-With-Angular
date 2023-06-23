import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { ToastService } from 'src/app/shared/services/toast/toast.service';
import * as userActions from "./user.action"
import { UserSharedService } from '../services/user.shared.service';


@Injectable()
export class UserInformationsEffects {
  getUserInformationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserInformationsAction.type),
      exhaustMap(() => this.userSharedService.getUserInformations()
        .pipe(
          map((response) => {
            return ({ type: userActions.getUserInformationsSucceed.type, userDatas: response })
          }),
          catchError((error) => {
            return of({ type: userActions.getUserInformationsFailed.type, message: error.error.message })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private userSharedService: UserSharedService,
    private toast: ToastService,
    private store: Store,
  ) { }

}

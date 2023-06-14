import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { updateUser, changeUserName } from './user.actions';
import { AuthService } from '../service/auth.service';

@Injectable()
export class UserEffects {
  updateUserName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      map(({ newDatas }) => changeUserName({ newName: newDatas.name }))
    )
  );

  constructor(private actions$: Actions, private userService: AuthService) { }
}

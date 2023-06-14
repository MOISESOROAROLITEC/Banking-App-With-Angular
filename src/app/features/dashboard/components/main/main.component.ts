import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateUser } from 'src/app/features/auth/store/user.actions';
import { getUserName } from 'src/app/features/auth/store/user.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  username: string | null | undefined
  username$: Observable<any>

  constructor(
    private store: Store,
  ) {
    this.username = localStorage.getItem("username")
    this.username$ = this.store.select(getUserName)
    this.store.dispatch(updateUser({ newDatas: { name: "soro", email: "soro@gmail.com" } }))
  }

  ngOnInit(): void {
    this.username$.subscribe(
      {
        next: (value) => value
      }
    );
  }

}

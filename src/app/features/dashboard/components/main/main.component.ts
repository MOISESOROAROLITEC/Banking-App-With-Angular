import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeUserName } from 'src/app/features/auth/store/user.actions';
import { getUserDatas, getUserFirstName, getUserInitial, getUserLastNames } from 'src/app/features/auth/store/user.selector';
import { UserDatas } from 'src/app/shared/constantes/constantes';



@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	userDatas$: Observable<UserDatas>
	userInitial$: Observable<string>
	firstName$: Observable<string>
	lastNames$: Observable<string>

	constructor(
		private store: Store<UserDatas>,
	) {
		this.userDatas$ = this.store.select(getUserDatas)
		this.userInitial$ = this.store.select(getUserInitial)
		this.firstName$ = this.store.select(getUserFirstName)
		this.lastNames$ = this.store.select(getUserLastNames)
	}

	ngOnInit(): void {
		this.userDatas$.subscribe({
			next: (value) => { }
		})
	}

	click() {
		this.store.dispatch(changeUserName({ newName: "new name" }))
	}

}

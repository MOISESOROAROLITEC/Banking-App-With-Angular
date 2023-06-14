import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // username$: Observable<string> | undefined
  username: string | null | undefined

  constructor() {
    this.username = localStorage.getItem("username")

  }

  ngOnInit(): void {
    // this.username = localStorage.getItem("username") || "aucun nom trouvé"
    // this.username$ = this.store.select(getUserName)
    console.log(this.username);
  }

}

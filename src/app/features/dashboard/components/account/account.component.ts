import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubAccount } from 'src/app/shared/constantes/constantes';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() loadingPokemon!: boolean
  @Input() subAccountInput!: SubAccount;
  @Output() onDeblockAccount = new EventEmitter<string>()
  @Output() onBlockAccount = new EventEmitter<string>()
  vieuxSold: boolean = true
  subAccount!: SubAccount

  constructor(

  ) { }

  ngOnInit() {
    this.subAccount = this.subAccountInput
  }

}

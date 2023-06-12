import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// import * as pfrom '../../../../../assets/svg/'

/** @title Form field appearance variants */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent {
  username: string = ""
  mail = ""
  password = ""
  hide = true
  check = false

  constructor() {
  }

  checkedConfidential() {
    this.check = !this.check
  }

  onSubmit() {

  }

}

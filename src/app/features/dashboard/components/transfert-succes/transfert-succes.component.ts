import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transfert-succes',
  templateUrl: './transfert-succes.component.html',
  styleUrls: ['./transfert-succes.component.scss']
})
export class TransfertSuccesComponent {
  constructor(
    public dialogRef: MatDialogRef<TransfertSuccesComponent>,
  ) { }

  onClick(): void {
    this.dialogRef.close();
  }
}

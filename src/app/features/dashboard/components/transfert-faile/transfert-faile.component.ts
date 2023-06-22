import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transfert-faile',
  templateUrl: './transfert-faile.component.html',
  styleUrls: ['./transfert-faile.component.scss']
})
export class TransfertFaileComponent {
  constructor(
    public dialogRef: MatDialogRef<TransfertFaileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errorMessage: string },
  ) { }

  onClick(): void {
    this.dialogRef.close();
  }
}

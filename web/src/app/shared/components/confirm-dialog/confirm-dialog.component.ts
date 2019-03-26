import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
  })

export class ConfirmDialogComponent {
  public confirmMessage: string;
    constructor(
      public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}

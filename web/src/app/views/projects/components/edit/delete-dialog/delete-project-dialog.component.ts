import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-delete-project-dialog',
    templateUrl: './delete-project-dialog.component.html',
    styleUrls: ['./delete-project-dialog.component.scss']
  })

export class DeleteProjectDialogComponent {
  public confirmMessage: string;
    constructor(
      public dialogRef: MatDialogRef<DeleteProjectDialogComponent>) {}
}

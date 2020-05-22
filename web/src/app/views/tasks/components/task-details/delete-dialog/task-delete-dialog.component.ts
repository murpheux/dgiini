import {Component, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-task-project-dialog',
    templateUrl: './task-delete-dialog.component.html',
    styleUrls: ['./task-delete-dialog.component.scss']
  })

export class TaskDeleteDialogComponent {
  public confirmMessage: string;
    constructor(
        public dialogRef: MatDialogRef<TaskDeleteDialogComponent>) {}
}

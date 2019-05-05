import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: "app-delete-stakeholder-dialog",
  templateUrl: "./delete-stakeholder-dialog.component.html",
  styleUrls: ["./delete-stakeholder-dialog.component.scss"]
})

export class DeleteStakeholderDialogComponent {
  public confirmMessage: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteStakeholderDialogComponent>
  ) {}
}

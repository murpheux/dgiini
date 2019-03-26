import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-delete-task-dialog",
  templateUrl: "./delete-task-dialog.component.html",
  styleUrls: ["./delete-task-dialog.component.scss"]
})
export class DeleteTaskDialogComponent {
  public confirmMessage: string;
  constructor(public dialogRef: MatDialogRef<DeleteTaskDialogComponent>) {}
}

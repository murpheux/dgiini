import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';

@Component({
  selector: 'app-vendorclient',
  templateUrl: './vendorclient.component.html',
  styleUrls: ['./vendorclient.component.scss']
})
export class VendorclientComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

}

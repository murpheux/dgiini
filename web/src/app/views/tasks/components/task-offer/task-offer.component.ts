import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IUser } from 'src/app/views/user/models/user';

export interface DialogData {
    task: ITask;
    user: IUser;
}

@Component({
    selector: 'app-task-offer',
    templateUrl: './task-offer.component.html',
    styleUrls: ['./task-offer.component.scss']
})
export class TaskOfferComponent implements OnInit, AfterViewInit {
    user: IUser;
    task: ITask;
    offerFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private taskService: TaskService,
        public dialogRef: MatDialogRef<TaskOfferComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: DialogData,
        public notificationService: NotificationService,
    ) {
        this.user = data.user;
        this.task = data.task;
    }

    ngOnInit() {
        this.buildForm();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    buildForm() {
        this.offerFormGroup = this.formBuilder.group({
            'amount': this.formBuilder.control('', [Validators.required]),
        });
    }

    handleSave(offerValues) {

        const bid = {
            task: this.task._id,
            user: this.user._id,
            amount: offerValues.amount
        };

        this.taskService.saveBid(bid).subscribe(success => {
            this.task.lastbid = success.payload.data;

            this.notificationService.showSuccess('bid submitted!');
            this.dialogRef.close();
        });
    }

}

import {
    AfterViewInit,
    ChangeDetectorRef, Component,

    OnDestroy, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { TaskDeleteDialogComponent } from './delete-dialog/task-delete-dialog.component';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
    // tslint:disable-next-line: no-any
    subscription: any;
    model: ITask;
    readonly = false;
    dialogRef: MatDialogRef<TaskDeleteDialogComponent>;

    taskFormGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private cd: ChangeDetectorRef,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params) => {
            const id = params.id;
            this.getTask(id);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    initializeContent(): void {}

    setEditMode(): void {
        this.readonly = true;
    }

    getTask(id: Guid): void {
        this.taskService.getTask(id).subscribe((response) => {
            this.model = response.payload.data.result;
            this.buildForms();
        });
    }

    buildForms(): void {
        this.taskFormGroup = this.formBuilder.group({
            id: this.formBuilder.control(this.model._id, [Validators.required]),
            title: this.formBuilder.control(this.model.title, [
                Validators.required,
            ]),
            description: this.formBuilder.control(this.model.description, [
                Validators.required,
            ]),
            category: this.formBuilder.control(this.model.category, [
                Validators.required,
            ]),
            clientid: this.formBuilder.control(this.model.client, [
                Validators.required,
            ]),
            clientname: this.formBuilder.control(this.model.client, [
                Validators.required,
            ]),
            street: this.formBuilder.control(this.model.location.street, [
                Validators.required,
            ]),
            city: this.formBuilder.control(this.model.location.city, [
                Validators.required,
            ]),
            state: this.formBuilder.control(this.model.location.state, [
                Validators.required,
            ]),
            zipcode: this.formBuilder.control(this.model.location.zipcode, [
                Validators.required,
            ]),
            country: this.formBuilder.control(this.model.location.country, [
                Validators.required,
            ]),
            estimated_hours: this.formBuilder.control(
                this.model.estimated_hours,
                [Validators.required]
            ),
        });
    }

    handleUpdateTask(): void {
        this.model.title = this.taskFormGroup.value.title;
        this.model.description = this.taskFormGroup.value.description;

        this.taskService
            .updateTask(this.model._id, this.model)
            .subscribe((d) => {
                this.model = undefined;
                this.router.navigate(['tasks']);
            });
    }

    handleCancel(): void {
        this.model = undefined;
        this.router.navigate(['tasks']);
    }

    handleBack(): void {
        this.model = undefined;
        this.router.navigate(['tasks']);
    }

    handleDeleteTask(id: Guid): void {
        this.taskService.deleteTask(id).subscribe((result) => {});
        this.router.navigate(['tasks']);
    }

    openConfirmationDialog(id: Guid): void {
        this.dialogRef = this.dialog.open(TaskDeleteDialogComponent, {
            disableClose: false,
        });
        this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete task '${this.model._id}' ?`;

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.handleDeleteTask(id);
            } else {
                this.dialogRef = undefined;
            }
        });
    }
}

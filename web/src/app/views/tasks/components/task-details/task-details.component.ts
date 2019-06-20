import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from './delete-dialog/delete-task-dialog.component';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

    subscription: any;
    model: ITask;
    readonly = false;
    dialogRef: MatDialogRef<DeleteTaskDialogComponent>;

    taskFormGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private cd: ChangeDetectorRef,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            const id = params['id'];
            this.getTask(id);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    initializeContent() {
    }

    setEditMode() {
        this.readonly = true;
    }

    getTask(id: string): void {
        this.taskService.getTask(id).subscribe(response => {
                this.model = response.payload.result;
                this.buildForms();
            });
    }

    buildForms() {
        this.taskFormGroup = this.formBuilder.group({
            'id': this.formBuilder.control(this.model.id, [ Validators.required ]),
            'title': this.formBuilder.control(this.model.title, [ Validators.required ]),
            'description': this.formBuilder.control(this.model.description, [ Validators.required ]),
            'category': this.formBuilder.control(this.model.category, [Validators.required]),
            'clientid': this.formBuilder.control(this.model.client.id, [Validators.required]),
            'clientname': this.formBuilder.control(this.model.client.name, [Validators.required]),
            'street': this.formBuilder.control(this.model.location.street, [Validators.required]),
            'city': this.formBuilder.control(this.model.location.city, [Validators.required]),
            'state': this.formBuilder.control(this.model.location.state, [Validators.required]),
            'zipcode': this.formBuilder.control(this.model.location.zipcode, [Validators.required]),
            'country': this.formBuilder.control(this.model.location.country, [Validators.required]),
            'estimated_hours': this.formBuilder.control(this.model.estimated_hours, [Validators.required]),
            'time': this.formBuilder.control(this.model.time, [Validators.required]),
            'status': this.formBuilder.control(this.model.status, [Validators.required])
        });
    }

    handleUpdateTask() {

        this.model.title = this.taskFormGroup.value.title;
        this.model.description = this.taskFormGroup.value.description;

        this.taskService.updateTask(this.model.id, this.model).subscribe(d => {
            this.model = null;
            this.router.navigate(['tasks']);
        });
    }

    handleCancel() {
        this.model = null;
        this.router.navigate(['tasks']);
    }

    handleBack() {
        this.model = null;
        this.router.navigate(['tasks']);
    }


    handleDeleteTask(id: string) {
        this.taskService.deleteTask(id).subscribe(result => {

        });
        this.router.navigate(['tasks']);
    }

    openConfirmationDialog(id: string) {
        this.dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete task '${this.model.id}' ?`;

        this.dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.handleDeleteTask(id);
            } else {
                this.dialogRef = null;
            }
        });
    }

}

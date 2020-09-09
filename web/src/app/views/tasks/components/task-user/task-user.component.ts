import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/views/user/models/user';
import { ITask, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
    selector: 'app-task-user',
    templateUrl: './task-user.component.html',
    styleUrls: ['./task-user.component.scss'],
})
export class TaskUserComponent implements OnInit {
    public taskList: ITask[];
    public completedTaskList: ITask[];
    public postedTaskList: ITask[];
    public cancelledTaskList: ITask[];
    public assignedTaskList: ITask[];
    public currentTask: ITask;
    public currentUser: IUser;
    public searchString: string;

    constructor(
        private taskService: TaskService,
        public dialog: MatDialog,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.getUserTasks(user);
            }
        });
    }

    getUserTasks(user: IUser): void {
        this.taskService.getUserTasks(user._id).subscribe((success) => {
            this.taskList = success.payload.data;

            if (this.taskList !== undefined && this.taskList.length !== 0) {
                this.currentTask = this.taskList[0];
                this.currentTask.selected = true;
            }

            this.taskService.enrichTasks(this.taskList);

            this.postedTaskList = this.taskList.filter(
                (task) => task.status === TaskStatus.open
            );

            this.completedTaskList = this.taskList.filter(
                (task) => task.status === TaskStatus.completed
            );
            this.cancelledTaskList = this.taskList.filter(
                (task) => task.status === TaskStatus.cancelled
            );
            this.assignedTaskList = this.taskList.filter(
                (task) => task.status === TaskStatus.assigned
            );
        });
    }

    searchUserTask(searchstr: string): void {
        this.taskService
            .searchUserTask(searchstr, this.currentUser._id)
            .subscribe((success) => {
                this.taskList = success.payload.data;

                if (this.taskList !== undefined && this.taskList.length !== 0) {
                    this.taskService.enrichTasks(this.taskList);
                    this.currentTask = this.taskList[0];
                    this.currentTask.selected = true;
                }
            });
    }

    handleTaskSelected(task: ITask): void {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.currentTask.selected = true;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }

    hangleToggleChanged(filter: string): void {}

    handleSearchClicked(searchString: string): void {
        this.searchUserTask(searchString);
    }

    getStatusColor = (status) => this.taskService.getStatusColor(status);
}

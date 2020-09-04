import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { IUser } from 'src/app/views/user/models/user';
import { ITask } from '../../models/ITask';
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
    public cancelledTaskList: ITask[];
    public assignedTaskList: ITask[];
    public currentTask: ITask;
    public currentUser: IUser;
    public searchString: string;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private authService: AuthService,
        private utilService: UtilService
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

            this.completedTaskList = this.taskList.filter(
                (task) => task.status === 'completed'
            );
            this.cancelledTaskList = this.taskList.filter(
                (task) => task.status === 'cancelled'
            );
            this.assignedTaskList = this.taskList.filter(
                (task) => task.status === 'assigned'
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

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ITask } from '../../models/ITask';
import { IUser } from 'src/app/views/user/models/user';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';

@Component({
    selector: 'app-task-user',
    templateUrl: './task-user.component.html',
    styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
    public model: ITask[];
    public currentTask: ITask;
    public currentUser: any;
    public searchString: string;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (this.authService.loggedIn) {
            this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));
            this.getUserTasks(this.currentUser);
        }
    }

    getUserTasks(user: any) {
        this.taskService.getUserTasks(user._id).subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }

            this.taskService.enrichTasks(this.model);
        });
    }

    searchUserTask(searchstr: string) {
        this.taskService.searchUserTask(searchstr, this.currentUser._id).subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.taskService.enrichTasks(this.model);
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }
        });
    }

    handleTaskSelected(task: ITask) {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.currentTask.selected = true;
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    hangleToggleChanged(filter: string) {
    }

    handleSearchClicked(searchString: string) {
        this.searchUserTask(searchString);
    }
}

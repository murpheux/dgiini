import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { ITask } from '../../models/ITask';
import { IUser } from 'src/app/views/user/models/user';

@Component({
    selector: 'app-task-user',
    templateUrl: './task-user.component.html',
    styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
    public model: ITask[];
    public currentTask: ITask;
    public currentUser: any;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.isLoggedIn().subscribe(islogin => {
            if (islogin) {
                this.authService.getCurrentUser().subscribe(user => {
                    this.currentUser = user;
                    this.getUserTasks(user);
                });
            }
        });
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

    handleTaskSelected(task: ITask) {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.currentTask.selected = true;
    }

}

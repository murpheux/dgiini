import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from 'src/app/views/user/services/user.service';
import { ITaskStats } from '../../models/ITaskStats';
import { IMemberStats } from '../../models/IMemberStats';

@Component({
    selector: 'app-task-stats',
    templateUrl: './task-stats.component.html',
    styleUrls: ['./task-stats.component.scss'],
})
export class TaskStatsComponent implements OnInit {
    taskStats: ITaskStats;
    userStats: IMemberStats;

    constructor(
        private taskService: TaskService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getTaskStatistics();
        this.getUserStatstics();
    }

    getTaskStatistics(): void {
        this.taskService.getTaskStatistics().subscribe((result) => {
            this.taskStats = result.payload.data;
        });
    }

    getUserStatstics(): void {
        this.userService.getUserStatstics().subscribe((result) => {
            this.userStats = result.payload.data;
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-featured-task',
    templateUrl: './featured-task.component.html',
    styleUrls: ['./featured-task.component.scss']
})
export class FeaturedTaskComponent implements OnInit {

    featuredTasks: [];
    recentTasks: [];

    constructor(
        private taskService: TaskService,
    ) { }

    ngOnInit() {
        this.getFeaturedTasks();
        this.getRecentTasks();
    }

    getFeaturedTasks() {
        this.taskService.getFeaturedTasks().subscribe(response => {
            const tasks = response.payload.data;
            this.featuredTasks = tasks.slice(0, 7);
        });
    }

    getRecentTasks() {
        this.taskService.getRecentTasks().subscribe(response => {
            const tasks = response.payload.data;
            this.recentTasks = tasks.slice(0, 3);
        });
    }

}

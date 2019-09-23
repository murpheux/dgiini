import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-stats',
    templateUrl: './task-stats.component.html',
    styleUrls: ['./task-stats.component.scss']
})
export class TaskStatsComponent implements OnInit {

    constructor(
        private taskService: TaskService,
    ) { }

    ngOnInit() {
        this.getStatistics();
    }

    getStatistics() {

    }
}

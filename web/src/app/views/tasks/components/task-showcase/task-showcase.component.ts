import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/IResponse';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-showcase',
    templateUrl: './task-showcase.component.html',
    styleUrls: ['./task-showcase.component.scss']
})
export class TaskShowcaseComponent implements OnInit {
    model: ITask[];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe((response: IResponse) => {
            this.model = response.payload;
        });
    }

}

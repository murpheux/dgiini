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
    movingModel: ITask[];
    gardenModel: ITask[];
    mowingModel: ITask[];
    nursingModel: ITask[];
    cleaningModel: ITask[];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getMovingTasks();
        this.getGardenTasks();
        this.getMowingTasks();
        this.getNursingTasks();
        this.getCleaningTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe((response: IResponse) => {
            this.model = response.payload;
        });
    }

    getMovingTasks() {
        this.taskService.getTasksByCategory('Moving').subscribe((response: IResponse) => {
            this.movingModel = response.payload;
        });
    }

    getGardenTasks() {
        this.taskService.getTasksByCategory('Garden').subscribe((response: IResponse) => {
            this.gardenModel = response.payload;
        });
    }

    getMowingTasks() {
        this.taskService.getTasksByCategory('Mowing').subscribe((response: IResponse) => {
            this.mowingModel = response.payload;
        });
    }

    getNursingTasks() {
        this.taskService.getTasksByCategory('Nursing').subscribe((response: IResponse) => {
            this.nursingModel = response.payload;
        });
    }

    getCleaningTasks() {
        this.taskService.getTasksByCategory('Cleaning').subscribe((response: IResponse) => {
            this.cleaningModel = response.payload;
        });
    }

}

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
    showcaseTabArray = ['Moving', 'Garden', 'Mowing', 'Nursing', 'Others'];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getMovingTasks();
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

    onGroupClick(selectedTab: any) {
        const category = this.showcaseTabArray[+selectedTab.index];

        switch (category) {
            case 'Moving': {
                if (!this.movingModel) {
                    this.getMovingTasks();
                }
                break;
            }
            case 'Garden': {
                if (!this.gardenModel) {
                    this.getGardenTasks();
                }
                break;
            }
            case 'Mowing': {
                if (!this.mowingModel) {
                    this.getMowingTasks();
                }
                break;
            }
            case 'Nursing': {
                if (!this.nursingModel) {
                    this.getNursingTasks();
                }
                break;
            }
            default: {
                if (!this.cleaningModel) {
                    this.getCleaningTasks();
                }
                break;
            }
        }
    }

}

import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/IResponse';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { AuthService } from 'src/app/views/user/services/auth.service';

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

    constructor(
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getMovingTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe((response: IResponse) => {
            this.model = response.payload;
            this.taskService.enrichTasks(this.model);
        });
    }

    getMovingTasks() {
        this.taskService.getTasksByCategories(['Moving']).subscribe((response: IResponse) => {
            this.movingModel = response.payload;
            this.taskService.enrichTasks(this.movingModel);
        });
    }

    getGardenTasks() {
        this.taskService.getTasksByCategories(['Garden']).subscribe((response: IResponse) => {
            this.gardenModel = response.payload;
            this.taskService.enrichTasks(this.gardenModel);
        });
    }

    getMowingTasks() {
        this.taskService.getTasksByCategories(['Mowing']).subscribe((response: IResponse) => {
            this.mowingModel = response.payload;
            this.taskService.enrichTasks(this.mowingModel);
        });
    }

    getNursingTasks() {
        this.taskService.getTasksByCategories(['Nursing']).subscribe((response: IResponse) => {
            this.nursingModel = response.payload;
            this.taskService.enrichTasks(this.nursingModel);
        });
    }

    getCleaningTasks() {
        this.taskService.getTasksByCategories(['Cleaning']).subscribe((response: IResponse) => {
            this.cleaningModel = response.payload;
            this.taskService.enrichTasks(this.cleaningModel);
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

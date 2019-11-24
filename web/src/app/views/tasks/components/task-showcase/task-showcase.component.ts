import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/IResponse';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { LocationService } from 'src/app/views/user/services/location.service';
import { Observable } from 'rxjs';

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
    showcaseTabArray = ['Moving', 'Gardening', 'Lawn Mowing', 'Childcare', 'Others'];

    constructor(
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getCategoryTask('Moving').then(ret => {
            this.movingModel = ret;
        });
    }

    getTasks() {
        this.taskService.getTasks().subscribe((response: IResponse) => {
            this.model = response.payload;
            this.taskService.enrichTasks(this.model);
        });
    }

    getCategoryTask(category): Promise<ITask[]> {

        return new Promise<ITask[]>((resolve, reject) => {
            this.taskService.getTasksByCategories([category]).subscribe((response: IResponse) => {
                    const model: ITask[] = response.payload;
                    this.taskService.enrichTasks(model);

                    resolve(model);
            });
        });
    }

    onGroupClick(selectedTab: any) {
        const category = this.showcaseTabArray[+selectedTab.index];

        switch (category) {
            case 'Moving': {
                if (!this.movingModel) {
                    this.getCategoryTask(category).then(ret => {
                        this.movingModel = ret;
                    });
                }
                break;
            }
            case 'Gardening': {
                if (!this.gardenModel) {
                    this.getCategoryTask(category).then(ret => {
                        this.gardenModel = ret;
                    });
                }
                break;
            }
            case 'Lawn Mowing': {
                if (!this.mowingModel) {
                    this.getCategoryTask(category).then(ret => {
                        this.mowingModel = ret;
                    });
                }
                break;
            }
            case 'Childcare': {
                if (!this.nursingModel) {
                    this.getCategoryTask(category).then(ret => {
                        this.nursingModel = ret;
                    });
                }
                break;
            }
            default: {
                if (!this.cleaningModel) {
                    this.getCategoryTask(category).then(ret => {
                        this.cleaningModel = ret;
                    });
                }
                break;
            }
        }
    }

}

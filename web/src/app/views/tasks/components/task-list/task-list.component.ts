import { Component, OnInit } from '@angular/core';
import { TableState } from 'src/app/core/datatable/table-state';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TaskService } from '../../services/task.service';
import { IResponse } from '../../models/IResponse';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    constructor(
        private taskService: TaskService
    ) { }

    model: any;

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe((response: IResponse) => {
                this.model = response.payload;
            });
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
    @Input() task: ITask;

    constructor() { }

    ngOnInit() {

    }

}

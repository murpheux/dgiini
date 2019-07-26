import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ITask } from '../../models/ITask';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
    @Input() task: ITask;
    @Output() taskSelected = new EventEmitter();
    public currentPrice: number;

    constructor() { }

    ngOnInit() {
        if (this.task.lastbid) {
            this.currentPrice = this.task.lastbid.amount;
        } else {
            this.currentPrice = this.task.rate.amount;
        }
    }

    ontaskcardclick() {
        this.taskSelected.emit(this.task);
    }

}

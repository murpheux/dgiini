import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ITask } from '../../models/ITask';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
    @Input() task: ITask;
    @Output() taskSelected = new EventEmitter();
    public currentPrice: number;

    faCalendar = faCalendar;
    faMapMarkerAlt = faMapMarkerAlt;

    constructor(
        private taskService: TaskService
    ) { }

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

import {
    Component,
    EventEmitter, Input, OnInit,
    Output
} from '@angular/core';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ITask } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
    @Input() task: ITask;
    @Output() taskSelected = new EventEmitter();
    public currentPrice: number;

    faCalendar = faCalendar;
    faMapMarkerAlt = faMapMarkerAlt;

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        if (this.task.lastbid) {
            this.currentPrice = this.task.lastbid.rate.amount;
        } else {
            this.currentPrice = this.task.rate.amount;
        }
    }

    ontaskcardclick(): void {
        this.taskSelected.emit(this.task);
    }

    getStatusColor = (status) => this.taskService.getStatusColor(status);
}

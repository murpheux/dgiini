import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-card-link',
    templateUrl: './task-card-link.component.html',
    styleUrls: ['./task-card-link.component.scss']
})
export class TaskCardLinkComponent implements OnInit {
    @Input() task: ITask;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    ontaskcardclick() {
        this.router.navigate([`/tasks/${this.task._id}`]);
    }
}

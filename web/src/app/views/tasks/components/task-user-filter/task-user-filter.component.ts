import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-task-user-filter',
    templateUrl: './task-user-filter.component.html',
    styleUrls: ['./task-user-filter.component.scss']
})
export class TaskUserFilterComponent implements OnInit {

    @Output() toggleChange = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    onToggleChanged(value) {
        this.toggleChange.emit(value);
    }

}

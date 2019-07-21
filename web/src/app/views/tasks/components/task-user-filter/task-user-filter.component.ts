import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task-user-filter',
    templateUrl: './task-user-filter.component.html',
    styleUrls: ['./task-user-filter.component.scss']
})
export class TaskUserFilterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onToggleChanged(value) {
        console.log(value);
    }

}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-task-user-filter',
    templateUrl: './task-user-filter.component.html',
    styleUrls: ['./task-user-filter.component.scss']
})
export class TaskUserFilterComponent implements OnInit {

    @Input() searchString: string;

    @Output() toggleChange = new EventEmitter<string>();
    @Output() searchClicked = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onToggleChanged(value) {
        this.toggleChange.emit(value);
    }

    onSearchClicked() {
        this.searchClicked.emit(this.searchString);
    }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-search',
    templateUrl: './task-search.component.html',
    styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit {
    searchFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
    ) { }

    ngOnInit() {

        this.searchFormGroup = this.formBuilder.group({
            'search': this.formBuilder.control('', [Validators.required])
        });
    }

    handleSearch(searchValues) {
        console.log(searchValues);
    }

}

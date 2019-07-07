import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-filter',
    templateUrl: './task-filter.component.html',
    styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
    categories = new FormControl();
    categoryList: string[];
    currentCity: string;
    cities: string[];
    @Input() selectedCategory: string[];
    @Input() distanceToHome: number;

    constructor(
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getTaskCategories();

        this.cities = ['Calgary', 'Edmonton', 'Red Deer'];
        this.currentCity = this.cities[0];
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            this.categoryList = response.payload;
        });
    }

}

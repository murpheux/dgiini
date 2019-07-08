import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-task-filter',
    templateUrl: './task-filter.component.html',
    styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
    categories = new FormControl();
    categoryList: string[];
    cities: string[];

    @Input() currentCity: string;
    @Input() selectedCategory: string[];
    @Input() distanceToHome: number;

    @Output() cityChanged = new EventEmitter<string>();
    @Output() distanceChanged = new EventEmitter<number>();
    @Output() hideChanged = new EventEmitter<boolean>();
    @Output() categoriesChanged = new EventEmitter();

    constructor(
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getTaskCategories();

        this.cities = ['Calgary', 'Edmonton', 'Red Deer', 'Montreal', 'Toronto', 'Vancouver'];
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            this.categoryList = response.payload;
        });
    }

    onCityChanged() {
        this.cityChanged.emit(this.currentCity);
    }

    onDistanceChanged() {
        this.distanceChanged.emit(this.distanceToHome);
    }

    onHideChanged(event: MatSlideToggleChange) {
        this.hideChanged.emit(event.checked);
    }

    onCategoriesChanged(event) {
        if (event.isUserInput) {
            const selectedCategories = this.selectedCategory ? this.selectedCategory : [];

            if (event.source.selected) {
                selectedCategories.push(event.source.value);
                this.categoriesChanged.emit(selectedCategories);
            } else {
                // wrap in promise to ensure it's done
                new Promise(resolve => {
                    resolve(selectedCategories.filter((ele) => ele !== event.source.value));
                }).then(res => {
                    this.categoriesChanged.emit(res);
                });
            }
        }
    }

}

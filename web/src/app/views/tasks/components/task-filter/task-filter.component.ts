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
    categoryList: string[];
    cities: string[];

    @Input() currentCity: string;
    @Input() selectedCategory: string[];
    @Input() distanceToHome: number;
    @Input() searchString: string;

    @Output() cityChanged = new EventEmitter<string>();
    @Output() distanceChanged = new EventEmitter<number>();
    @Output() hideChanged = new EventEmitter<boolean>();
    @Output() categoriesChanged = new EventEmitter();
    @Output() searchClicked = new EventEmitter();

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

    formatLabel(value: number | null) {
        if (!value) {
            return 0;
        }

        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
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

    onSearchClicked() {
        this.searchClicked.emit(this.searchString);
    }

}

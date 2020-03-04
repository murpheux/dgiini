import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-task-filter',
    templateUrl: './task-filter.component.html',
    styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
    categoryCol1: string[];
    categoryCol2: string[];
    cities: string[];
    searchPreloading = false;

    searchControl: FormControl = new FormControl();
    cityControl: FormControl = new FormControl();
    filteredOptions: Observable<string[]>;
    formCtrlSub: Subscription;

    @Input() currentCity: string;
    @Input() selectedCategory: string[];
    @Input() distanceToHome: number;
    @Input() searchString: string;

    @Output() cityChanged = new EventEmitter<string>();
    @Output() distanceChanged = new EventEmitter<number>();
    @Output() hideChanged = new EventEmitter<boolean>();
    @Output() categoriesChanged = new EventEmitter();
    @Output() searchClicked = new EventEmitter();

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getTaskCategories();
        this.cities = ['Calgary', 'Edmonton', 'Red Deer', 'Montreal', 'Toronto', 'Vancouver'];

        this.distanceToHome = 50; // default 50kms

        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
                map(term => {
                    this.searchClicked.emit(term);
                })
        ).subscribe();

        this.filteredOptions = this.cityControl.valueChanges
            .pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    chechInSelected(category: string) {
        if (this.selectedCategory) {
            return this.selectedCategory.includes(category);
        } else {
            return false;
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter(option => option.toLowerCase().includes(filterValue));
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            const categoryList: string[] = response.payload.data;

            this.categoryCol1 = categoryList.slice(0, categoryList.length / 2);
            this.categoryCol2 = categoryList.slice(categoryList.length / 2);
        });
    }

    onCityChanged(city: string) {
        this.currentCity = city;
        this.cityChanged.emit(city);
    }

    onDistanceChanged() {
        this.distanceChanged.emit(this.distanceToHome);
    }

    onHideChanged(event: MatSlideToggleChange) {
        this.hideChanged.emit(event.checked);
    }

    formatLabel(value: number | null) {
        if (!value) {
            return this.distanceToHome;
        }

        if (value >= 100) {
            return 100; // Math.round(value / 1000) + 'k';
        }

        this.distanceToHome = value;
        return value;
    }

    // tslint:disable-next-line: no-any
    onCategoriesChanged(event: any) {
        if (event.target) {
            this.selectedCategory = this.selectedCategory ? this.selectedCategory : [];

            if (event.target.checked) {
                this.selectedCategory.push(event.currentTarget.id);
                this.categoriesChanged.emit(this.selectedCategory);
            } else {
                // wrap in promise to ensure it's done
                new Promise(resolve => {
                    resolve(this.selectedCategory.filter((ele) => ele !== event.currentTarget.id));
                }).then(res => {
                    this.categoriesChanged.emit(res);
                    this.selectedCategory = res as string[];
                });
            }
        }
    }

    onSearchClicked() {
        this.searchClicked.emit(this.searchString);
    }

    // tslint:disable-next-line: no-any
    onValueChange(event: any) {
        this.distanceToHome = event.target.value;
    }
}

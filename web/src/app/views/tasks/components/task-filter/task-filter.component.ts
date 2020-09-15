import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith
} from 'rxjs/operators';
import { Constants } from 'src/app/shared/models/constants';
import { ICityLocation } from 'src/app/views/user/models/city';
import { LocationService } from 'src/app/views/user/services/location.service';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-filter',
    templateUrl: './task-filter.component.html',
    styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent implements OnInit {
    categoryCol1: string[];
    categoryCol2: string[];
    cities: string[] = Constants.CANADA_CITIES;
    searchPreloading = false;
    public selectCityPreLoading = false;
    public cityList = [];

    searchControl: FormControl = new FormControl();
    cityControl: FormControl = new FormControl();
    filteredOptions: Observable<string[]>;
    public selectCityInput = new Subject<string>();
    formCtrlSub: Subscription;

    @Input() currentCity: ICityLocation;
    @Input() selectedCategory: string[];
    @Input() distanceToHome: number;
    @Input() searchString: string;

    @Output() cityChanged = new EventEmitter<string>();
    @Output() distanceChanged = new EventEmitter<number>();
    @Output() hideChanged = new EventEmitter<boolean>();
    @Output() categoriesChanged = new EventEmitter();
    @Output() searchClicked = new EventEmitter();

    constructor(
        private locationService: LocationService,
        private taskService: TaskService
        ) {}

    ngOnInit(): void {
        this.getTaskCategories();
        this.distanceToHome = 50; // default 50kms
        this.cityList = this.cities;

        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                map((term) => {
                    this.searchClicked.emit(term);
                })
            )
            .subscribe();

        this.selectCityInput.pipe(debounceTime(500), distinctUntilChanged()
            ).subscribe(term => {
                this.selectCityPreLoading = true;
                this.lookupCity(term);
            });

        this.filteredOptions = this.cityControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value))
        );
    }

    chechInSelected(category: string): boolean {
        if (this.selectedCategory) {
            return this.selectedCategory.includes(category);
        } else {
            return false;
        }
    }

    lookupCity(term: string): void {
        this.selectCityPreLoading = false;
        this.cityList = this.cities.filter(c => c.startsWith(term));
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    getTaskCategories(): void {
        this.taskService.getTaskCategories().subscribe((response) => {
            const categoryList: string[] = response.payload.data;

            this.categoryCol1 = categoryList.slice(0, categoryList.length / 2);
            this.categoryCol2 = categoryList.slice(categoryList.length / 2);
        });
    }

    onCityChanged(city: string): void {
        this.currentCity.city = city;
        this.cityChanged.emit(city);
    }

    onDistanceChanged(): void {
        this.distanceChanged.emit(this.distanceToHome);
    }

    onHideChanged(event: MatSlideToggleChange): void {
        this.hideChanged.emit(event.checked);
    }

    formatLabel(value: number | null): number {
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
    onCategoriesChanged(event: any): void {
        if (event.target) {
            this.selectedCategory = this.selectedCategory
                ? this.selectedCategory
                : [];

            if (event.target.checked) {
                this.selectedCategory.push(event.currentTarget.id);
                this.categoriesChanged.emit(this.selectedCategory);
            } else {
                // wrap in promise to ensure it's done
                new Promise((resolve) => {
                    resolve(
                        this.selectedCategory.filter(
                            (ele) => ele !== event.currentTarget.id
                        )
                    );
                }).then((res) => {
                    this.categoriesChanged.emit(res);
                    this.selectedCategory = res as string[];
                });
            }
        }
    }

    onSearchClicked(): void {
        this.searchClicked.emit(this.searchString);
    }

    // tslint:disable-next-line: no-any
    onValueChange(event: any): void {
        this.distanceToHome = event.target.value;
    }

    handleCityChange(): void {
        this.searchClicked.emit(this.searchString);
        this.locationService.changeCurrentCity(this.currentCity.city);
    }
}

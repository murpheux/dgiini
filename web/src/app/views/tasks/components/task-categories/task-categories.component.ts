import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from 'src/app/views/user/services/location.service';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { VendorService } from 'src/app/views/vendor/services/vendor.service';
import { IUser, IVendor } from 'src/app/views/user/models/user';
import { Constants } from 'src/app/shared/models/constants';
import { IMessage } from 'src/app/views/message/models/message';

@Component({
    selector: 'app-task-categories',
    templateUrl: './task-categories.component.html',
    styleUrls: ['./task-categories.component.scss']
})
export class TaskCategoriesComponent implements OnInit {
    model: ITask[];
    vendorModel: IVendor[];
    currentTask: ITask;
    currentVendor: IVendor;
    distanceToHome: number;
    selectedCategory: string[];
    searchString: string;
    defaultDistanceToHome = 55;
    currentCity: string;
    currentUser: IUser;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private locationService: LocationService,
        private authService: AuthService,
        private vendorService: VendorService
    ) { }

    ngOnInit() {
        this.locationService.getCurrentCity().then(city => {
            this.currentCity = city;

            this.route.params.subscribe(params => {
                if (params['category']) {
                    const category = params['category'];

                    this.selectedCategory = [category];
                    this.getTasksByCategory(category, this.currentCity);
                } else if (params['searchstr']) {
                    this.searchString = params['searchstr'];
                    this.searchTask(this.searchString);
                } else {
                    this.taskService.getTaskCategories().subscribe(response => {
                        this.selectedCategory = response.payload; // select all categories
                        this.getTasksByCategories(this.selectedCategory, this.currentCity);
                    });
                }
            });
        });

        if (this.authService.loggedIn) {
            this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));
        }

        this.distanceToHome = this.defaultDistanceToHome;
    }

    searchTask(searchstr: string) {
        this.taskService.searchTask(searchstr).subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.taskService.enrichTasks(this.model);
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }
        });
    }

    getTasksByCategory(category: string, city: string) {
        this.getTasksByCategories([category], city);
    }

    getTasksByCategories(categories: string[], city: string) {
        this.taskService.getTasksByCategoriesAndCity(categories, city).subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.taskService.enrichTasks(this.model);
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }

            if (this.model && this.model.length > 0) {
                this.getRecommendedVendor(this.model[0]);
            }
        });
    }

    getFeaturedVendor() {
        this.vendorService.getFeaturedVendor().subscribe(success => {
            this.vendorModel = success.payload;
        });
    }

    getRecommendedVendor(task: ITask) {
        this.vendorService.getRecommendedVendor(task).subscribe(success => {
            this.vendorModel = success.payload;
        });
    }

    // getTasks() {
    //     this.taskService.getTasks().subscribe(success => {
    //         this.model = success.payload;

    //         if (this.model !== undefined && this.model.length !== 0) {
    //             this.taskService.enrichTasks(this.model);
    //             this.currentTask = this.model[0];
    //             this.currentTask.selected = true;
    //         }
    //     });
    // }

    handleTaskSelected(task: ITask) {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.getRecommendedVendor(task);
        this.currentTask.selected = true;
    }

    handleVendorSelected(vendor: IVendor) {
        this.currentVendor.selected = false;
        this.currentVendor = vendor;
        this.currentVendor.selected = true;
    }

    handleCityChanged(city: string) {
        this.currentCity = city;
        this.locationService.setCurrentCity(city);

        this.getTasksByCategories(this.selectedCategory, city);
    }

    handleDistanceChanged(distance: number) {
    }

    handleCategoryChanged(categories: string[]) {
        if (categories.length === 0) {
            this.getTasksByCategories([], this.currentCity);
        } else {
            this.getTasksByCategories(categories, this.currentCity);
        }
    }

    handleHideChanged(state: boolean) {
    }

    handleSearchClicked(searchString: string) {
        this.searchTask(searchString);
    }

}

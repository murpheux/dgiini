import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/views/user/services/auth.service';

@Component({
    selector: 'app-task-categories',
    templateUrl: './task-categories.component.html',
    styleUrls: ['./task-categories.component.scss']
})
export class TaskCategoriesComponent implements OnInit {
    model: ITask[];
    currentTask: ITask;
    distanceToHome: number;
    selectedCategory: string[];
    searchString: string;
    defaultDistanceToHome = 55;
    currentCity: string;
    public currentUser: any;

    title = 'app';
    faCoffee = faCoffee;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['category']) {
                const category = params['category'];

                this.selectedCategory = [category];
                this.getTasksByCategory(category);
            } else if (params['searchstr']) {
                this.searchString = params['searchstr'];
                this.searchTask(this.searchString);
            } else {
                this.getTasks();
            }
        });

        this.authService.isLoggedIn().subscribe(islogin => {
            if (islogin) {
                this.authService.getCurrentUser().subscribe(user => {
                    this.currentUser = user;
                });
            }
        });

        this.distanceToHome = this.defaultDistanceToHome;
        this.authService.getCurrentCity().then(city => {
            this.currentCity = city;
        });
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

    getTasksByCategory(category: string) {
        this.getTasksByCategories([category]);
    }

    getTasksByCategories(categories: string[]) {
        this.taskService.getTasksByCategories(categories).subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.taskService.enrichTasks(this.model);
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }
        });
    }

    getTasks() {
        this.taskService.getTasks().subscribe(success => {
            this.model = success.payload;

            if (this.model !== undefined && this.model.length !== 0) {
                this.taskService.enrichTasks(this.model);
                this.currentTask = this.model[0];
                this.currentTask.selected = true;
            }
        });
    }

    handleTaskSelected(task: ITask) {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.currentTask.selected = true;
    }

    handleCityChanged(city: string) {
        this.currentCity = city;
        this.authService.setCurrentCity(city);
    }

    handleDistanceChanged(distance: number) {
    }

    handleCategoryChanged(categories: string[]) {
        if (categories.length === 0) {
            this.getTasks();
        } else {
            this.getTasksByCategories(categories);
        }
    }

    handleHideChanged(state: boolean) {
    }

    handleSearchClicked(searchString: string) {
        this.searchTask(searchString);
    }

}

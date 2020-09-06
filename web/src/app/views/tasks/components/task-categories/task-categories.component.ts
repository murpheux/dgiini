import {
    AfterViewChecked, AfterViewInit, Component,
    ElementRef, OnInit,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { TaskerService } from 'src/app/views/tasker/services/tasker.service';
import { ICityLocation } from 'src/app/views/user/models/city';
import { IUser } from 'src/app/views/user/models/user';
import { IVendor } from 'src/app/views/user/models/vendor';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-categories',
    templateUrl: './task-categories.component.html',
    styleUrls: ['./task-categories.component.scss'],
})
export class TaskCategoriesComponent
    implements OnInit, AfterViewInit, AfterViewChecked {
    taskList: ITask[];
    taskCount: number;
    taskerModel: IVendor[];
    currentTask: ITask;
    currentVendor: IVendor;
    distanceToHome: number;
    selectedCategory: string[];
    searchString: string;
    defaultDistanceToHome = 55;
    currentCity: ICityLocation;
    currentUser: IUser;

    @ViewChild('inputTag', { static: true }) set inputTag(
        input: ElementRef | null
    ) {
        if (!input) {
            return;
        }

        // do something
        // doSomething(input);
    }

    // @ViewChildren('task') tasks: QueryList<any>;
    @ViewChild('scrollAreaGrp', { static: true }) scrollDiv: ElementRef;

    // tslint:disable-next-line: variable-name
    private _intersectionObserver?: IntersectionObserver;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private locationService: LocationService,
        private authService: AuthService,
        private taskerService: TaskerService,
        // tslint:disable-next-line: variable-name
        private _element: ElementRef,
        private utilService: UtilService
    ) {}

    async ngOnInit(): Promise<void> {
        this.locationService.getCurrentCity().then((city) => {
            this.currentCity = city;

            this.route.params.subscribe((params) => {
                if (params.category) {
                    const category = params.category;

                    if (category === 'browse') {
                        this.getTasksByCity();
                    } else {
                        this.selectedCategory = [category];
                        this.getTasksByCategory(category, this.currentCity.city);
                    }
                } else if (params.searchstr) {
                    this.searchString = params.searchstr;
                    this.searchTask(this.searchString);
                } else if (params.taskid) {
                    this.getTask(params.taskid);
                } else {
                    this.getTasksByCity();
                }
            });
        });

        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });

        this.distanceToHome = this.defaultDistanceToHome;
    }

    getTasksByCity(): void {
        this.taskService
            .getTaskCategories()
            .subscribe((response) => {
                this.selectedCategory = response.payload.data; // select all categories
                this.getTasksByCategories(
                    this.selectedCategory,
                    this.currentCity.city
                );
            });
    }

    ngAfterViewInit(): void {
        // this.tasks.forEach(
        //   task => task.nativeElement.addEventListener('click', () => {
        //     let item: any;
        //     const element: any = document.getElementsByClassName('task');
        //     for (item of element) {
        //       item.classList.remove('active');
        //     }
        //     task.nativeElement.classList.add('active');
        //   })
        // );

        const lastCard = this.scrollDiv.nativeElement.querySelector(
            '.lastOfMe'
        );

        // const options = {
        //     root: document.querySelector('#scrollArea'),
        //     rootMargin: '0px',
        //     threshold: 1.0
        // };

        // this._intersectionObserver = new IntersectionObserver(entries => {
        //     this.checkForIntersection(entries);
        // }, options);

        // this._intersectionObserver.observe(lastCard);
    }

    ngAfterViewChecked(): void {
    }

    private checkForIntersection = (
        entries: Array<IntersectionObserverEntry>
    ) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this._intersectionObserver.unobserve(
                    this._element.nativeElement as Element
                );
                this._intersectionObserver.disconnect();
            }
        });
    }

    private checkIfIntersecting(entry: IntersectionObserverEntry): any {
        // tslint:disable-next-line: no-any
        return (
            (entry as any).isIntersecting &&
            entry.target === this._element.nativeElement
        );
    }

    getTask(taskid: Guid): void {
        if (taskid) {
            this.taskService.getTask(taskid).subscribe((success) => {
                this.currentTask = success.payload.data;

                if (this.currentTask) {
                    this.taskService.enrichTasks([this.currentTask]);
                    this.currentTask.selected = true;
                }
            });
        }
    }

    searchTask(searchstr: string): void {
        if (searchstr) {
            this.taskService.searchTask(searchstr).subscribe((success) => {
                this.taskList = success.payload.data;
                this.taskCount = success.payload.count;

                if (this.taskList !== undefined && this.taskList.length !== 0) {
                    this.taskService.enrichTasks(this.taskList);
                    this.currentTask = this.taskList[0];
                    this.currentTask.selected = true;
                }
            });
        } else {
            this.getTasksByCategories(
                this.selectedCategory,
                this.currentCity.city
            );
        }
    }

    getTasksByCategory(category: string, city: string): void {
        this.getTasksByCategories([category], city);
    }

    getTasksByCategories(categories: string[], city: string): void {
        this.taskService
            .getTasksByCategoriesAndCity(categories, city)
            .subscribe((success) => {
                this.taskList = success.payload.data;
                this.taskCount = success.payload.count;

                if (this.taskList !== undefined && this.taskList.length !== 0) {
                    this.taskService.enrichTasks(this.taskList);
                    this.currentTask = this.taskList[0];
                    this.currentTask.selected = true;
                }

                if (this.taskList && this.taskList.length > 0) {
                    this.getRecommendedVendor(this.taskList[0]);
                }
            });
    }

    getFeaturedVendor(): void {
        this.taskerService.getFeaturedVendor().subscribe((success) => {
            this.taskerModel = success.payload.data;
        });
    }

    getRecommendedVendor(task: ITask): void {
        this.taskerService.getRecommendedVendor(task).subscribe((success) => {
            this.taskerModel = success.payload.data;
        });
    }

    handleTaskSelected(task: ITask): void {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.getRecommendedVendor(task);
        this.currentTask.selected = true;
    }

    handleVendorSelected(tasker: IVendor): void {
        this.currentVendor.selected = false;
        this.currentVendor = tasker;
        this.currentVendor.selected = true;
    }

    handleCityChanged(city: string): void {
        this.currentCity.city = city;
        this.locationService.setCurrentCity(city);

        this.getTasksByCategories(this.selectedCategory, city);
    }

    handleDistanceChanged(distance: number): void {}

    handleCategoryChanged(categories: string[]): void {
        if (categories.length === 0) {
            this.getTasksByCategories([], this.currentCity.city);
        } else {
            this.getTasksByCategories(categories, this.currentCity.city);
        }
    }

    handleHideChanged(state: boolean): void {}

    handleSearchClicked(searchString: string): void {
        this.searchTask(searchString);
    }

    handleStatusChanged(task: ITask): void {
        const i = this.taskList.indexOf(task);
        this.taskList.splice(i, 1);
    }

    // tslint:disable-next-line: no-any
    handleScroll(event: any): void {}

    handleOverflow(event: any): void {}
}

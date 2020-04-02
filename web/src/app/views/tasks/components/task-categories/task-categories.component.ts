import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from 'src/app/views/user/services/location.service';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { VendorService } from 'src/app/views/vendor/services/vendor.service';
import { IUser, IVendor } from 'src/app/views/user/models/user';
import { Constants } from 'src/app/shared/models/constants';
import { ICityLocation } from 'src/app/views/user/models/city';

@Component({
    selector: 'app-task-categories',
    templateUrl: './task-categories.component.html',
    styleUrls: ['./task-categories.component.scss']
})
export class TaskCategoriesComponent implements OnInit, AfterViewInit, AfterViewChecked {
    taskList: ITask[];
    taskCount: number;
    vendorModel: IVendor[];
    currentTask: ITask;
    currentVendor: IVendor;
    distanceToHome: number;
    selectedCategory: string[];
    searchString: string;
    defaultDistanceToHome = 55;
    currentCity: ICityLocation;
    currentUser: IUser;

    @ViewChild('inputTag', { static: true}) set inputTag(input: ElementRef|null) {
        if (!input) { return; }

        // do something
        // doSomething(input);
    }

    // @ViewChildren('task') tasks: QueryList<any>;
    @ViewChild('scrollAreaGrp', { static: true}) scrollDiv: ElementRef;

    private _intersectionObserver?: IntersectionObserver;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private locationService: LocationService,
        private authService: AuthService,
        private vendorService: VendorService,
        private _element: ElementRef
    ) { }

    ngOnInit() {
        this.locationService.getCurrentCity().then(city => {
            this.currentCity = city;

            this.route.params.subscribe(params => {
                if (params['category']) {
                    const category = params['category'];

                    this.selectedCategory = [category];
                    this.getTasksByCategory(category, this.currentCity.city);
                } else if (params['searchstr']) {
                    this.searchString = params['searchstr'];
                    this.searchTask(this.searchString);
                } else {
                    this.taskService.getTaskCategories().subscribe(response => {
                        this.selectedCategory = response.payload.data; // select all categories
                        this.getTasksByCategories(this.selectedCategory, this.currentCity.city);
                    });
                }
            });
        });

        if (this.authService.loggedIn) {
            this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));
        }

        this.distanceToHome = this.defaultDistanceToHome;
    }

    ngAfterViewInit() {
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

        const lastCard = this.scrollDiv.nativeElement.querySelector('.lastOfMe');

        if (lastCard) {
            console.log(JSON.stringify(lastCard));
        }

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
        // const lastCard = this.scrollDiv.nativeElement.querySelector('.lastOfMe');
        // const lastCard = this.scrollDiv.nativeElement.querySelector('.task-list div:last-child');

        // if (lastCard) {
        //     console.log(JSON.stringify(lastCard));
        // }
    }

    private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                console.log('event triggered!');

                this._intersectionObserver.unobserve((this._element.nativeElement) as Element);
                this._intersectionObserver.disconnect();
            }
        });
    }

    private checkIfIntersecting(entry: IntersectionObserverEntry) {
        // tslint:disable-next-line: no-any
        return (entry as any).isIntersecting && entry.target === this._element.nativeElement;
    }

    searchTask(searchstr: string) {
        if (searchstr) {
            this.taskService.searchTask(searchstr).subscribe(success => {
                this.taskList = success.payload.data;
                this.taskCount = success.payload.count;

                if (this.taskList !== undefined && this.taskList.length !== 0) {
                    this.taskService.enrichTasks(this.taskList);
                    this.currentTask = this.taskList[0];
                    this.currentTask.selected = true;
                }
            });
        } else {
            this.getTasksByCategories(this.selectedCategory, this.currentCity.city);
        }
    }

    getTasksByCategory(category: string, city: string) {
        this.getTasksByCategories([category], city);
    }

    getTasksByCategories(categories: string[], city: string) {
        this.taskService.getTasksByCategoriesAndCity(categories, city).subscribe(success => {
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

    getFeaturedVendor() {
        this.vendorService.getFeaturedVendor().subscribe(success => {
            this.vendorModel = success.payload.data;
        });
    }

    getRecommendedVendor(task: ITask) {
        this.vendorService.getRecommendedVendor(task).subscribe(success => {
            this.vendorModel = success.payload.data;
        });
    }

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
        this.currentCity.city = city;
        this.locationService.setCurrentCity(city);

        this.getTasksByCategories(this.selectedCategory, city);
    }

    handleDistanceChanged(distance: number) {
    }

    handleCategoryChanged(categories: string[]) {
        if (categories.length === 0) {
            this.getTasksByCategories([], this.currentCity.city);
        } else {
            this.getTasksByCategories(categories, this.currentCity.city);
        }
    }

    handleHideChanged(state: boolean) {
    }

    handleSearchClicked(searchString: string) {
        this.searchTask(searchString);
    }

    // tslint:disable-next-line: no-any
    handleScroll(event: any) {
    }

    handleOverflow(event: any) {
    }
}

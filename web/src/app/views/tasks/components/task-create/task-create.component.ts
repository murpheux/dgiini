import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ITask, TaskType, RateUnit, Currency } from '../../models/ITask';
import { TaskValidator } from '../../models/Validators/TaskValidator';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LocationService } from 'src/app/views/user/services/location.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { Guid } from 'guid-typescript';


@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, AfterViewInit {

    public currentTabOpen = 1;
    @ViewChild('postTaskBackBtn', { static: false }) postTaskBackBtn: ElementRef;
    @ViewChild('postTaskNextBtn', { static: false }) postTaskNextBtn: ElementRef;
    @ViewChild('postTaskPostBtn', { static: false }) postTaskPostBtn: ElementRef;
    @ViewChild('postTaskProgressBar', { static: false }) postTaskProgressBar: ElementRef;
    @ViewChild('postTaskProgressText', { static: false }) postTaskProgressText: ElementRef;

    taskFormGroup: FormGroup;

    countries: string[];
    cities: string[];
    states: string[];
    categoryList: string[];
    options: string[];
    // tslint:disable-next-line: no-any
    options_keys: any;

    rateunits: string[];
    // tslint:disable-next-line: no-any
    rateunits_keys: any;

    currentCity: string;
    currentState: string;
    currentCountry: string;
    // tslint:disable-next-line: no-any
    currentUser: any;
    selectedCategory: string;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private notificationService: NotificationService,
        private authService: AuthService,
        public dialogRef: MatDialogRef<TaskCreateComponent>
    ) { }

    ngOnInit() {
        this.initializeContent();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    initializeContent() {
        // tslint:disable-next-line: no-any
        this.options = Object.keys(TaskType).filter(k => typeof TaskType[k as any] === 'number');
        // tslint:disable-next-line: no-any
        this.options_keys = this.options.map(k => TaskType[k as any]);

        // tslint:disable-next-line: no-any
        this.rateunits = Object.keys(RateUnit).filter(k => typeof RateUnit[k as any] === 'number');
        // tslint:disable-next-line: no-any
        this.rateunits_keys = this.rateunits.map(k => RateUnit[k as any]);

        // set default values
        this.cities = ['Calgary', 'Edmonton', 'Red Deer', 'Montreal', 'Toronto', 'Vancouver'];
        this.currentCity = this.cities[0];

        this.states = ['AB', 'ON', 'SK', 'MN', 'QC', 'BC'];
        this.currentState = this.states[0];

        this.countries = ['Canada', 'United States'];
        this.currentCountry = this.countries[0];

        this.taskService.getTaskCategories().subscribe(response => {
            this.categoryList = response.payload.data;
        });

        if (this.authService.loggedIn) {
            this.authService.userProfile$.subscribe(profile => {
                this.currentUser = profile;
            });
        }
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

    // tslint:disable-next-line: no-any
    handleSave(formValues: any): void {

        const currentDate = new Date();

        const task: ITask = {
            title: formValues.task1FormGroup.title,
            description: formValues.task1FormGroup.description,
            category: formValues.task1FormGroup.category,

            location: {
                street: formValues.task2FormGroup.street,
                city: formValues.task2FormGroup.city,
                state: formValues.task2FormGroup.state,
                country: formValues.task2FormGroup.country,
                zipcode: formValues.task2FormGroup.zipcode
            },

            rate: {
                unit: formValues.task4FormGroup.rateunit,
                amount: formValues.task4FormGroup.rate,
                currency: Currency.CAD,
                date: currentDate
            },

            client: {
                // TODO: remove next line
                id: Guid.create(),
                name: 'Clement Onawole'
                // id: this.currentUser._id,
                // name: this.currentUser.name
            },

            scheduled_date: new Date(`${formValues.task3FormGroup.taskdate} ${formValues.task3FormGroup.tasktime}`),
            created: currentDate,
            estimated_hours: formValues.task4FormGroup.esthrs,
        };

        const validator = new TaskValidator();
        const result = validator.validate(task);

        if (result.isValid) {
            this.taskService.saveTask(task).subscribe(success => {
                this.notificationService.showSuccess('Task saved!');
                this.dialogRef.close();
            });
        } else {
            const messages = result.getFailureMessages();
            this.notificationService.showWarning(`Input is invalid - ${messages}`);
        }
    }

    cancel() { }

    onCountryChanged() { }

    onStateChanged() {  }

    nextTab() {
        if (this.currentTabOpen > 5) { return false; }

        // Close Old Tab
        const oldTab = document.getElementById('post-task-step-' + this.currentTabOpen);
        oldTab.classList.remove('active');
        oldTab.classList.add('fade');
        // Increment To Next Tab
        this.currentTabOpen++;
        // Open Next Tab
        const newTab = document.getElementById('post-task-step-' + this.currentTabOpen);
        newTab.classList.add('active');
        newTab.classList.remove('fade');

        if (this.currentTabOpen === 2) {
            this.postTaskProgressBar.nativeElement.style.width = '33%';
            this.postTaskProgressText.nativeElement.innerHTML = '33%';
            this.postTaskBackBtn.nativeElement.classList.remove('d-none');
        }

        if (this.currentTabOpen === 3) {
            this.postTaskProgressBar.nativeElement.style.width = '50%';
            this.postTaskProgressText.nativeElement.innerHTML = '50%';
        }

        if (this.currentTabOpen === 4) {
            this.postTaskProgressBar.nativeElement.style.width = '66%';
            this.postTaskProgressText.nativeElement.innerHTML = '66%';
        }

        if (this.currentTabOpen === 5) {
            this.postTaskProgressBar.nativeElement.style.width = '83%';
            this.postTaskProgressText.nativeElement.innerHTML = '83%';
        }

        if (this.currentTabOpen === 6) {
            this.postTaskProgressBar.nativeElement.style.width = '100%';
            this.postTaskProgressText.nativeElement.innerHTML = '100%';
            this.postTaskNextBtn.nativeElement.classList.add('d-none');
            this.postTaskPostBtn.nativeElement.classList.remove('d-none');
        }
    }

    previousTab() {
        // Close Old Tab
        const oldTab = document.getElementById('post-task-step-' + this.currentTabOpen);
        oldTab.classList.remove('active');
        oldTab.classList.add('fade');
        // Increment To Next Tab
        this.currentTabOpen--;
        // Open Next Tab
        const newTab = document.getElementById('post-task-step-' + this.currentTabOpen);
        newTab.classList.add('active');
        newTab.classList.remove('fade');

        if (this.currentTabOpen === 1) {
            this.postTaskProgressBar.nativeElement.style.width = '16%';
            this.postTaskProgressText.nativeElement.innerHTML = '16%';
            this.postTaskBackBtn.nativeElement.classList.add('d-none');
        }

        if (this.currentTabOpen === 2) {
            this.postTaskProgressBar.nativeElement.style.width = '33%';
            this.postTaskProgressText.nativeElement.innerHTML = '33%';
        }

        if (this.currentTabOpen === 3) {
            this.postTaskProgressBar.nativeElement.style.width = '50%';
            this.postTaskProgressText.nativeElement.innerHTML = '50%';
        }

        if (this.currentTabOpen === 4) {
            this.postTaskProgressBar.nativeElement.style.width = '66%';
            this.postTaskProgressText.nativeElement.innerHTML = '66%';
        }

        if (this.currentTabOpen === 5) {
            this.postTaskProgressBar.nativeElement.style.width = '83%';
            this.postTaskProgressText.nativeElement.innerHTML = '83%';
            this.postTaskNextBtn.nativeElement.classList.remove('d-none');
            this.postTaskPostBtn.nativeElement.classList.add('d-none');
        }
    }
}

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { ICityLocation } from 'src/app/views/user/models/city';

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

    // taskForm: Array<FormGroup>;
    taskForm: FormGroup;

    task: ITask;
    countries: string[];
    cities: string[];
    states: string[];
    categoryList: string[];
    options: string[];
    currentCity: ICityLocation;
    currentState: string;
    currentCountry: string;
    rateunits: string[];
    selectedCategory: string;
    activeStepIndex: number;
    uploadedImages: File[] = [];
    photos: string[] = [];

    mouseoverSave = false;
    percentage = [0, 16, 33, 50, 66, 83, 100];

    // tslint:disable-next-line: no-any
    optionsKeys: any;
    // tslint:disable-next-line: no-any
    rateunitsKeys: any;
    // tslint:disable-next-line: no-any
    currentUser: any;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private notificationService: NotificationService,
        private authService: AuthService,
        private locationService: LocationService,
        public dialogRef: MatDialogRef<TaskCreateComponent>
    ) { }

    ngOnInit() {
        this.initializeContent();
        this.buildForm();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    async initializeContent() {
        // tslint:disable-next-line: no-any
        this.options = Object.keys(TaskType).filter(k => typeof TaskType[k as any] === 'number');
        // tslint:disable-next-line: no-any
        this.optionsKeys = this.options.map(k => TaskType[k as any]);

        // tslint:disable-next-line: no-any
        this.rateunits = Object.keys(RateUnit).filter(k => typeof RateUnit[k as any] === 'number');
        // tslint:disable-next-line: no-any
        this.rateunitsKeys = this.rateunits.map(k => RateUnit[k as any]);

        this.currentCity = await this.locationService.getCurrentCity();

        this.taskService.getTaskCategories().subscribe(response => {
            this.categoryList = response.payload.data;
        });

        if (this.authService.loggedIn) {
            this.authService.userProfile$.subscribe(profile => {
                this.currentUser = profile;
            });
        }
    }

    buildForm() {
        this.activeStepIndex = 0;

        // this.taskForm = [
        //     new FormGroup({
        //         title: this.formBuilder.control('', [ Validators.required, Validators.minLength(10) ]),
        //         description: this.formBuilder.control('', [ Validators.required, Validators.minLength(25) ]),
        //         category: this.formBuilder.control('', [ Validators.required ]),
        //     }),
        //     new FormGroup({ }), // dummy
        //     new FormGroup({
        //         street: this.formBuilder.control('', [ Validators.required ]),
        //         city: this.formBuilder.control('Calgary', [ Validators.required ]),
        //         state: this.formBuilder.control('AB', [ Validators.required ]),
        //         country: this.formBuilder.control('Canada', [ Validators.required ]),
        //         zipcode: this.formBuilder.control('', [ Validators.required ]),
        //     }),
        //     new FormGroup({
        //         date: this.formBuilder.control('', [ Validators.required ]),
        //         time: this.formBuilder.control('', [ Validators.required ]),
        //     }),
        //     new FormGroup({
        //         amount: this.formBuilder.control('', [ Validators.required, Validators.min(1) ]),
        //         unit: this.formBuilder.control('', [ Validators.required ]),
        //         duration: this.formBuilder.control('', [ Validators.required, Validators.min(1) ]),
        //     }),
        // ];

        this.taskForm = this.formBuilder.group({
            subTaskForms: this.formBuilder.array([
                this.formBuilder.group({
                    title: this.formBuilder.control('', [ Validators.required, Validators.minLength(10) ]),
                    description: this.formBuilder.control('', [ Validators.required, Validators.minLength(25) ]),
                    category: this.formBuilder.control('', [ Validators.required ]),
                }),
                this.formBuilder.group({ }), // dummy
                this.formBuilder.group({
                    street: this.formBuilder.control('', [ Validators.required ]),
                    city: this.formBuilder.control('Calgary', [ Validators.required ]),
                    state: this.formBuilder.control('AB', [ Validators.required ]),
                    country: this.formBuilder.control('Canada', [ Validators.required ]),
                    zipcode: this.formBuilder.control('', [ Validators.required ]),
                }),
                this.formBuilder.group({
                    date: this.formBuilder.control('', [ Validators.required ]),
                    time: this.formBuilder.control('', [ Validators.required ]),
                }),
                this.formBuilder.group({
                    amount: this.formBuilder.control('', [ Validators.required, Validators.min(1) ]),
                    unit: this.formBuilder.control('', [ Validators.required ]),
                    duration: this.formBuilder.control('', [ Validators.required, Validators.min(1) ]),
                }),
            ])
        });
    }

    get forms(): Array<FormGroup> {
        return (this.taskForm.get('subTaskForms') as FormArray).controls as Array<FormGroup>;
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
                this.notificationService.showSuccess('Task saved successfully!');
                this.dialogRef.close();
            });
        } else {
            const messages = result.getFailureMessages();
            this.notificationService.showWarning(`Input is invalid - ${messages}`);
        }
    }

    cancel() {
        this.dialogRef.close();
    }

    onCountryChanged() { }

    onStateChanged() {  }

    nextTab() {
        if (this.currentTabOpen > 5) { return false; }

        const currentTabId = `#post-task-step-${this.currentTabOpen}`;

        // Close current Tab
        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Increment To Next Tab
        this.currentTabOpen++;

        // Open Next Tab
        const newTabId = `#post-task-step-${this.currentTabOpen}`;

        $(newTabId).addClass('active');
        $(newTabId).removeClass('fade');
        $(newTabId).removeClass('d-none');

        const progressBar = this.postTaskProgressBar.nativeElement;

        switch (this.currentTabOpen) {
            case 1:
                break;

            case 2:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskBackBtn.nativeElement.classList.remove('d-none');
                break;

            case 3:
            case 4:
            case 5:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                break;

            case 6:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskNextBtn.nativeElement.classList.add('d-none');
                this.postTaskPostBtn.nativeElement.classList.remove('d-none');
                break;

            default:
               break;
        }

    }

    previousTab() {
        // Close current Tab
        const currentTabId = `#post-task-step-${this.currentTabOpen}`;

        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Increment To Next Tab
        this.currentTabOpen--;

        // Open Next Tab
        const nextTabId = `#post-task-step-${this.currentTabOpen}`;

        $(nextTabId).addClass('active');
        $(nextTabId).removeClass('fade');
        $(nextTabId).removeClass('d-none');

        switch (this.currentTabOpen) {

            case 1:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskBackBtn.nativeElement.classList.add('d-none');
                break;

            case 2:
            case 3:
            case 4:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                break;

            case 5:
                this.postTaskProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postTaskNextBtn.nativeElement.classList.remove('d-none');
                this.postTaskPostBtn.nativeElement.classList.add('d-none');
                break;

            default:
                break;
        }

    }

    removeUpload(index: number) {
        this.uploadedImages.splice(index, 1);
        this.photos.splice(index, 1);
    }

    handleFileInput(files: FileList) {
        Array.from(files).forEach(async file => {
            this.uploadedImages.push(file);
            const base64 = await this.imageFileToBase64(file);
            this.photos.push(base64.toString());
        });
    }

    imageFileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

}

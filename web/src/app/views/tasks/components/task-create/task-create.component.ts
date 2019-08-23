import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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


@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, AfterViewInit {

    taskFormGroup: FormGroup;

    countries: string[];
    cities: string[];
    states: string[];
    options: string[];
    options_keys: any;

    rateunits: string[];
    rateunits_keys: any;

    currentCity: string;
    currentState: string;
    currentCountry: string;
    currentUser: any;

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
        this.buildForms();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    initializeContent() {
        this.options = Object.keys(TaskType).filter(k => typeof TaskType[k as any] === 'number');
        this.options_keys = this.options.map(k => TaskType[k as any]);

        this.rateunits = Object.keys(RateUnit).filter(k => typeof RateUnit[k as any] === 'number');
        this.rateunits_keys = this.rateunits.map(k => RateUnit[k as any]);

        // set default values
        this.cities = ['Calgary', 'Edmonton', 'Red Deer', 'Montreal', 'Toronto', 'Vancouver'];
        this.currentCity = this.cities[0];

        this.states = ['AB', 'ON', 'SK', 'MN', 'QC', 'BC'];
        this.currentState = this.states[0];

        this.countries = ['Canada', 'United States'];
        this.currentCountry = this.countries[0];

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

    buildForms() {

        this.taskFormGroup = this.formBuilder.group({
            'task1FormGroup': this.formBuilder.group({
                'title': this.formBuilder.control(null,
                    [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
                'description': this.formBuilder.control(null,
                    [Validators.required, Validators.minLength(25), Validators.maxLength(1000)])
            }),

            'task2FormGroup': this.formBuilder.group({
                'street': this.formBuilder.control(null, [Validators.required]),
                'city': this.formBuilder.control(this.currentCity, [Validators.required]),
                'state': this.formBuilder.control(this.currentState, [Validators.required]),
                'zipcode': this.formBuilder.control(null,
                    [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
                'country': this.formBuilder.control(this.currentCountry, [Validators.required]),
                'taskdate': this.formBuilder.control(null, [Validators.required])
            }),

            'task3FormGroup': this.formBuilder.group({
                'rateunit': this.formBuilder.control(null, [Validators.required]),
                'rate': this.formBuilder.control(null, [Validators.required]),
                'esthrs': this.formBuilder.control(null, [Validators.required])
            })
        });
    }

    handleSave(formValues: any): void {

        const currentDate = new Date();

        const task: ITask = {
            title: formValues.task1FormGroup.title,
            description: formValues.task1FormGroup.description,

            location: {
                street: formValues.task2FormGroup.street,
                city: formValues.task2FormGroup.city,
                state: formValues.task2FormGroup.state,
                country: formValues.task2FormGroup.country,
                zipcode: formValues.task2FormGroup.zipcode
            },

            rate: {
                unit: formValues.task3FormGroup.rateunit,
                amount: formValues.task3FormGroup.rate,
                currency: Currency.CAD,
                date: currentDate
            },

            client: {
                id: this.currentUser._id,
                name: this.currentUser.name
            },

            scheduled_date: new Date(formValues.task2FormGroup.taskdate),
            created: currentDate,
            category: 'Driver',
            estimated_hours: formValues.task3FormGroup.esthrs,
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

    onStateChanged() { }

}

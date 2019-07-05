import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ITask, Task, Schedule, TaskType, Quotation, RateUnit } from '../../models/ITask';
import { TaskValidator } from '../../models/Validators/TaskValidator';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../models/IAddress';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, AfterViewInit {

    taskStep1FormGroup: FormGroup;
    taskStep2FormGroup: FormGroup;
    taskStep3FormGroup: FormGroup;

    countries: [];
    cities: [];
    states: [];
    model: ITask;
    options: string[];
    options_keys: any;

    rateunits: string[];
    rateunits_keys: any;

    constructor(
        private formBuilder: FormBuilder,
        private service: TaskService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.initializeContent();

        this.buildForms();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    initializeContent() {
        this.model = new Task();
        this.model.schedule = new Schedule();
        this.model.location = new Address();
        this.model.quote = new Quotation();

        this.options = Object.keys(TaskType).filter(k => typeof TaskType[k as any] === 'number');
        this.options_keys = this.options.map(k => TaskType[k as any]);

        this.rateunits = Object.keys(RateUnit).filter(k => typeof RateUnit[k as any] === 'number');
        this.rateunits_keys = this.rateunits.map(k => RateUnit[k as any]);
    }

    buildForms() {
        this.taskStep1FormGroup = this.formBuilder.group({
            'id': this.formBuilder.control(this.model._id),
            'title': this.formBuilder.control(this.model.title,
                [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
            'description': this.formBuilder.control(this.model.description,
                [Validators.required, Validators.minLength(25), Validators.maxLength(1000)])
        });

        this.taskStep2FormGroup = this.formBuilder.group({
            'taskType': this.formBuilder.control(this.model.taskType, [Validators.required]),
            'city': this.formBuilder.control(this.model.location.city, [Validators.required]),
            'taskDate': this.formBuilder.control(this.model.schedule.date, [Validators.required])
        });

        this.taskStep3FormGroup = this.formBuilder.group({
            'rateunit': this.formBuilder.control(this.model.quote.unit, [Validators.required]),
            'rate': this.formBuilder.control(this.model.quote.rate, [Validators.required]),
            'esthrs': this.formBuilder.control(this.model.estimated_hours, [Validators.required]),
        });
    }

    save() {

        this.model.title = this.taskStep1FormGroup.value.title;
        this.model.description = this.taskStep1FormGroup.value.description;

        const validator = new TaskValidator();

        const result = validator.validate(this.model);

        if (result.isInvalid) {
            // return to form
            const failures = result.getFailures();
            const messages = result.getFailureMessages();

            this.toastr.warning('', 'validation error!');

        } else {
            this.service.saveTask(this.model);
            this.toastr.success('Task saved!', 'saved');
        }
    }

    cancel() {

    }

    onCountryChanged() {

    }

    onStateChanged() {

    }

}

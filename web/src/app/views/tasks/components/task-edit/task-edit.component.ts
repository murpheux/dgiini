import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from '../../models/photo';
import { ITask, RateUnit, TaskType } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
    task: ITask;
    countries: string[];
    cities: string[];
    states: string[];
    categoryList: string[];
    options: string[];
    currentState: string;
    currentCountry: string;
    rateunits: string[];
    selectedCategory: string;
    activeStepIndex: number;
    photos: IPhoto[] = [];

    taskForm: FormGroup;
    // tslint:disable-next-line: no-any
    optionsKeys: any;
    // tslint:disable-next-line: no-any
    rateunitsKeys: any;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.task = history.state.data;

        if (this.task === undefined) {
            // get params
            this.route.params.subscribe((params) => {
                if (params.id) {
                    const id = params.id;

                    this.taskService.getTask(id).subscribe(res => {
                        this.task = res.payload.data;

                        this.buildForm();
                    });
                }
            });
        } else {
            this.buildForm();
        }

        this.photos = this.task.photos;
        this.initializeContent();
    }

    buildForm(): void {
        this.taskForm = this.formBuilder.group({
            title: this.formBuilder.control(this.task.title, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            description: this.formBuilder.control(this.task.description, [
                Validators.required,
                Validators.minLength(15),
                Validators.maxLength(1000),
            ]),
            category: this.formBuilder.control(this.task.category, [
                Validators.required,
            ]),
            street: this.formBuilder.control(this.task.location.street, [Validators.required]),
            city: this.formBuilder.control(this.task.location.city, [
                Validators.required,
            ]),
            state: this.formBuilder.control(this.task.location.state, [
                Validators.required,
            ]),
            country: this.formBuilder.control(this.task.location.country, [
                Validators.required,
            ]),
            zipcode: this.formBuilder.control(this.task.location.zipcode, [
                Validators.required,
            ]),
            date: this.formBuilder.control(this.task.scheduled_date, [Validators.required]),
            time: this.formBuilder.control('3:00', [Validators.required]),
            amount: this.formBuilder.control(this.task.rate.amount, [
                Validators.required,
                Validators.min(1),
            ]),
            unit: this.formBuilder.control(this.task.rate.unit, [Validators.required]),
            duration: this.formBuilder.control(this.task.estimated_hours, [
                Validators.required,
                Validators.min(1),
            ]),
        });
    }

    async initializeContent(): Promise<void> {
        // tslint:disable-next-line: no-any
        this.options = Object.keys(TaskType).filter(
            (k) => typeof TaskType[k as any] === 'number'
        );
        // tslint:disable-next-line: no-any
        this.optionsKeys = this.options.map((k) => TaskType[k as any]);

        // tslint:disable-next-line: no-any
        this.rateunits = Object.keys(RateUnit).filter(
            (k) => typeof RateUnit[k as any] === 'number'
        );
        // tslint:disable-next-line: no-any
        this.rateunitsKeys = this.rateunits.map((k) => RateUnit[k as any]);

        this.taskService.getTaskCategories().subscribe((response) => {
            this.categoryList = response.payload.data;
        });

    }

    calculateAmount(unit: string, amount: number, duration: number): string {
        let result = 0;

        switch (unit) {
            case 'Total':
                result = amount;
                break;

            case 'Hourly':
                result = amount * duration;
                break;

            default:
                result = 0;
                break;
        }

        return result.toString();
    }

    handleUpdate(formValues: any): void {
        console.log(formValues);
    }

    removeUpload(index: number): void {
        this.photos.splice(index, 1);
    }
}

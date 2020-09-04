import {
    AfterViewInit, ChangeDetectorRef, Component,
    ElementRef, OnInit,
    ViewChild
} from '@angular/core';
import {
    FormArray, FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ICityLocation } from 'src/app/views/user/models/city';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ImageFilType, IPhoto } from '../../models/IPhoto';
import { Currency, ITask, RateUnit, TaskType } from '../../models/ITask';
import { TaskValidator } from '../../models/Validators/TaskValidator';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit, AfterViewInit {
    public currentTabOpen = 1;
    @ViewChild('postTaskBackBtn', { static: false })
    postTaskBackBtn: ElementRef;
    @ViewChild('postTaskNextBtn', { static: false })
    postTaskNextBtn: ElementRef;
    @ViewChild('postTaskPostBtn', { static: false })
    postTaskPostBtn: ElementRef;
    @ViewChild('postTaskProgressBar', { static: false })
    postTaskProgressBar: ElementRef;
    @ViewChild('postTaskProgressText', { static: false })
    postTaskProgressText: ElementRef;

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
    photos: IPhoto[] = [];

    mouseoverSave = false;
    percentage = [16, 33, 50, 66, 83, 100];

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

    ngOnInit(): void {
        this.initializeContent();
        this.buildForm();
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
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

        this.currentCity = await this.locationService.getCurrentCity();

        this.taskService.getTaskCategories().subscribe((response) => {
            this.categoryList = response.payload.data;
        });

        if (await this.authService.isLoggedIn$.toPromise()) {
            this.currentUser = await this.authService.getUser$();
        }
    }

    buildForm(): void {
        this.activeStepIndex = 0;

        this.taskForm = this.formBuilder.group({
            subTaskForms: this.formBuilder.array([
                this.formBuilder.group({
                    title: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(50),
                    ]),
                    description: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(25),
                        Validators.maxLength(1000),
                    ]),
                    category: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
                this.formBuilder.group({}), // dummy
                this.formBuilder.group({
                    street: this.formBuilder.control('', [Validators.required]),
                    city: this.formBuilder.control('Calgary', [
                        Validators.required,
                    ]),
                    state: this.formBuilder.control('AB', [
                        Validators.required,
                    ]),
                    country: this.formBuilder.control('Canada', [
                        Validators.required,
                    ]),
                    zipcode: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
                this.formBuilder.group({
                    date: this.formBuilder.control('', [Validators.required]),
                    time: this.formBuilder.control('', [Validators.required]),
                }),
                this.formBuilder.group({
                    amount: this.formBuilder.control('', [
                        Validators.required,
                        Validators.min(1),
                    ]),
                    unit: this.formBuilder.control('', [Validators.required]),
                    duration: this.formBuilder.control('', [
                        Validators.required,
                        Validators.min(1),
                    ]),
                }),
            ]),
        });
    }

    get forms(): Array<FormGroup> {
        return (this.taskForm.get('subTaskForms') as FormArray)
            .controls as Array<FormGroup>;
    }

    formatLabel(value: number | null): any {
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
            title: formValues.subTaskForms[0].title,
            description: formValues.subTaskForms[0].description,
            category: formValues.subTaskForms[0].category,

            location: {
                street: formValues.subTaskForms[2].street,
                city: formValues.subTaskForms[2].city,
                state: formValues.subTaskForms[2].state,
                country: formValues.subTaskForms[2].country,
                zipcode: formValues.subTaskForms[2].zipcode,
            },

            rate: {
                unit: formValues.subTaskForms[4].unit,
                amount: formValues.subTaskForms[4].amount,
                currency: Currency.CAD,
                date: currentDate,
            },

            client: {
                id: this.currentUser._id,
                name: this.currentUser.name,
            },

            scheduled_date: new Date(
                `${formValues.subTaskForms[3].date} ${formValues.subTaskForms[3].time}`
            ),
            created: currentDate,
            estimated_hours: formValues.subTaskForms[4].esthrs,

            photos: this.photos,
        };

        const validator = new TaskValidator();
        const result = validator.validate(task);

        if (result.isValid) {
            this.taskService.saveTask(task).subscribe((success) => {
                this.notificationService.showSuccess(
                    'Task saved successfully!'
                );
                this.dialogRef.close();
            });
        } else {
            const messages = result.getFailureMessages();
            this.notificationService.showWarning(
                `Input is invalid - ${messages}`
            );
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    nextTab(): boolean {
        if (this.currentTabOpen > 5) {
            return false;
        }

        const currentTab = this.currentTabOpen;
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
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskBackBtn.nativeElement.classList.remove('d-none');
                break;

            case 3:
            case 4:
            case 5:
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                break;

            case 6:
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskNextBtn.nativeElement.classList.add('d-none');
                this.postTaskPostBtn.nativeElement.classList.remove('d-none');
                break;

            default:
                break;
        }
    }

    previousTab(): void {
        // Close current Tab
        const currentTabId = `#post-task-step-${this.currentTabOpen}`;

        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Increment To Next Tab
        this.currentTabOpen--;

        // Open Next Tab
        const currentTab = this.currentTabOpen  - 1;
        const nextTabId = `#post-task-step-${this.currentTabOpen}`;

        $(nextTabId).addClass('active');
        $(nextTabId).removeClass('fade');
        $(nextTabId).removeClass('d-none');

        switch (this.currentTabOpen) {
            case 1:
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskBackBtn.nativeElement.classList.add('d-none');
                break;

            case 2:
            case 3:
            case 4:
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                break;

            case 5:
                this.postTaskProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                    }%`;
                this.postTaskNextBtn.nativeElement.classList.remove('d-none');
                this.postTaskPostBtn.nativeElement.classList.add('d-none');
                break;

            default:
                break;
        }
    }

    removeUpload(index: number): void {
        this.photos.splice(index, 1);
    }

    handleFileInput(files: FileList): void {
        Array.from(files).forEach(async (file) => {
            const base64 = await this.imageFileToBase64(file);
            this.photos.push({
                filename: file.name,
                photo: base64.toString(),
                filetype: ImageFilType['image/png'],
            });
        });
    }

    imageFileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })

    thumbnailify = (base64Image, targetSize, callback) => {
        const img = new Image();

        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = canvas.height = targetSize;

            ctx.drawImage(
                img,
                width > height ? (width - height) / 2 : 0,
                height > width ? (height - width) / 2 : 0,
                width > height ? height : width,
                width > height ? height : width,
                0,
                0,
                targetSize,
                targetSize
            );

            callback(canvas.toDataURL());
        };

        img.src = base64Image;
    }

    //   const sourceImage = document.getElementById("source-image");
    //   const thumbnail = document.getElementById("thumbnail");

    //   thumbnailify(sourceImage.src, 100, (base64Thumbnail) => {
    //       thumbnail.src = base64Thumbnail;
    //   });
}

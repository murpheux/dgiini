import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { range } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserValidator } from 'src/app/views/tasks/models/Validators/UserValidator';
import { ICityLocation } from '../../models/city';
import { IClient } from '../../models/client';
import { IProfile } from '../../models/profile';
import { IUser } from '../../models/user';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    currentCity: ICityLocation;

    public currentTabOpen = 1;
    @ViewChild('postBackBtn', { static: false }) postBackBtn: ElementRef;
    @ViewChild('postNextBtn', { static: false }) postNextBtn: ElementRef;
    @ViewChild('postPostBtn', { static: false }) postPostBtn: ElementRef;
    @ViewChild('postProgressBar', { static: false })
    postProgressBar: ElementRef;
    @ViewChild('postProgressText', { static: false })
    postProgressText: ElementRef;
    @ViewChild('photoImg', { static: false }) photoImg: ElementRef;

    userForm: FormGroup;
    user: IUser;
    activeStepIndex: number;
    yearList: number[];

    mouseoverSave = false;
    percentage = [25, 50, 75, 100];
    monthInYear = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    howHeardList = ['website', 'word of mouth', 'campaign flyers', 'radio', 'tv', 'others'];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private notificationService: NotificationService,
        private locationService: LocationService,
        public dialogRef: MatDialogRef<RegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IProfile
    ) {}

    async ngOnInit(): Promise<void> {
        this.user = {
            _id: undefined,
            username: this.data?.email,
            name: this.data?.name,
            picture: this.data?.picture,
            role: [ 'client' ], // default for new user
        };

        this.currentCity = await this.locationService.getCurrentCity();

        this.initializeContent();
        this.buildForm();
    }

    initializeContent(): void {
        const year = (new Date()).getFullYear();

        range(year - 100, 101)
            .pipe(toArray())
            .subscribe(rng => {
                this.yearList = rng.reverse();
            });
    }

    buildForm(): void {
        this.activeStepIndex = 0;
        const currentYear = (new Date()).getFullYear();

        this.userForm = this.formBuilder.group({
            subUserForms: this.formBuilder.array([
                this.formBuilder.group({
                    name: this.formBuilder.control(this.user.name, [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(50),
                    ]),
                    phone: this.formBuilder.control('', [
                        Validators.required,
                        Validators.maxLength(50),
                    ]),
                    month: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    year: this.formBuilder.control(currentYear, [
                        Validators.required,
                        Validators.max(currentYear),
                    ]),
                }),
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
                    summary: this.formBuilder.control('', []),
                    howHeard: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
            ]),
        });
    }

    get forms(): Array<FormGroup> {
        return (this.userForm.get('subUserForms') as FormArray)
            .controls as Array<FormGroup>;
    }

    // tslint:disable-next-line: no-any
    handleSave(formValues: any): void {

        const client: IClient = {
            _id: this.user._id,
            name: formValues.subUserForms[0].name,
            username: this.user.username,
            email: this.user.username,
            phone: formValues.subUserForms[0].phone,
            role: this.user.role,
            dob: {
                month: formValues.subUserForms[0].month,
                year: formValues.subUserForms[0].year
            },
            address: {
                street: formValues.subUserForms[1].street,
                city: formValues.subUserForms[1].city,
                state: formValues.subUserForms[1].state,
                country: formValues.subUserForms[1].country,
                zipcode: formValues.subUserForms[1].zipcode
            },
            job_city: this.currentCity.city,
            how_heard: formValues.subUserForms[2].howHeard,
            summary: formValues.subUserForms[2].summary,
            picture: this.user.picture
        };

        const validator = new UserValidator();
        const result = validator.validate(client);

        if (result.isValid) {
            this.userService.saveClient(client).subscribe(success => {
                this.notificationService.showSuccess(
                    'User information saved successfully!'
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
        if (this.currentTabOpen > 3) {
            return false;
        }

        const currentTab = this.currentTabOpen;
        const currentTabId = `#register-step-${this.currentTabOpen}`;

        // Close current Tab
        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Increment To Next Tab
        this.currentTabOpen++;

        // Open Next Tab
        const newTabId = `#register-step-${this.currentTabOpen}`;

        $(newTabId).addClass('active');
        $(newTabId).removeClass('fade');
        $(newTabId).removeClass('d-none');

        // const progressBar = this.postProgressBar.nativeElement;

        switch (this.currentTabOpen) {
            case 1:
                break;

            case 2:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                this.postBackBtn.nativeElement.classList.remove('d-none');
                break;

            case 3:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                break;

            case 4:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                this.postNextBtn.nativeElement.classList.add('d-none');
                this.postPostBtn.nativeElement.classList.remove('d-none');
                break;

            default:
                break;
        }
    }

    previousTab(): void {
        // Close current Tab
        const currentTabId = `#register-step-${this.currentTabOpen}`;

        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Decrement To Next Tab
        this.currentTabOpen--;

        // Open Next Tab
        let currentTab = this.currentTabOpen;
        currentTab--;
        const nextTabId = `#register-step-${this.currentTabOpen}`;

        $(nextTabId).addClass('active');
        $(nextTabId).removeClass('fade');
        $(nextTabId).removeClass('d-none');

        switch (this.currentTabOpen) {
            case 1:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                this.postBackBtn.nativeElement.classList.add('d-none');
                break;

            case 2:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                break;

            case 3:
                this.postProgressBar.nativeElement.style.width = `${
                    this.percentage[currentTab]
                }%`;
                this.postProgressText.nativeElement.innerHTML = `${
                    this.percentage[currentTab]
                }%`;
                this.postNextBtn.nativeElement.classList.remove('d-none');
                this.postPostBtn.nativeElement.classList.add('d-none');
                break;

            default:
                break;
        }
    }
}

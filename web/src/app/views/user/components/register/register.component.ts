import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { IUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageFilType } from 'src/app/views/tasks/models/IPhoto';
import { UserValidator } from 'src/app/views/tasks/models/Validators/UserValidator';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public currentTabOpen = 1;
    @ViewChild('postBackBtn', { static: false }) postBackBtn: ElementRef;
    @ViewChild('postNextBtn', { static: false }) postNextBtn: ElementRef;
    @ViewChild('postPostBtn', { static: false }) postPostBtn: ElementRef;
    @ViewChild('postProgressBar', { static: false }) postProgressBar: ElementRef;
    @ViewChild('postProgressText', { static: false }) postProgressText: ElementRef;
    @ViewChild('photoImg', { static: false }) photoImg: ElementRef;

    userForm: FormGroup;
    user: IUser;
    activeStepIndex: number;

    mouseoverSave = false;
    percentage = [0, 5, 25, 50, 75, 100];

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private locationService: LocationService,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<RegisterComponent>
    ) { }

    ngOnInit(): void {
        this.initializeContent();
        this.buildForm();

        this.user = {
            _id: undefined,
            username: '',
            password: '',
            name: '',
            source: '',
            role: '',
            rating: 5,
            photo: undefined,
            created: undefined,
            lastLogin: undefined,
            aboutMember: undefined,
            joined: undefined
        };
    }

    async initializeContent() {
    }

    buildForm() {
        this.activeStepIndex = 0;

        this.userForm = this.formBuilder.group({
            subUserForms: this.formBuilder.array([
                this.formBuilder.group({
                    name: this.formBuilder.control('', [ Validators.required, Validators.minLength(10),
                            Validators.maxLength(50) ]),
                    phone: this.formBuilder.control('', [ Validators.required,
                            Validators.maxLength(50) ]),
                    dob: this.formBuilder.control('', [ Validators.required,
                            Validators.maxLength(1000) ]),
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
                    howHeard: this.formBuilder.control('', [ Validators.required ]),
                }),
            ])
        });
    }

    get forms(): Array<FormGroup> {
        return (this.userForm.get('subUserForms') as FormArray).controls as Array<FormGroup>;
    }

    // tslint:disable-next-line: no-any
    handleSave(formValues: any): void {

        const currentDate = new Date();

        this.user.name = formValues.subTaskForms[0].title;
            // description: formValues.subTaskForms[0].description,
            // category: formValues.subTaskForms[0].category,

            // location: {
            //     street: formValues.subTaskForms[2].street,
            //     city: formValues.subTaskForms[2].city,
            //     state: formValues.subTaskForms[2].state,
            //     country: formValues.subTaskForms[2].country,
            //     zipcode: formValues.subTaskForms[2].zipcode
            // },

            // scheduled_date: new Date(`${formValues.subTaskForms[3].date} ${formValues.subTaskForms[3].time}`),
            // created: currentDate,
            // estimated_hours: formValues.subTaskForms[4].esthrs,

        const validator = new UserValidator();
        const result = validator.validate(this.user);

        if (result.isValid) {
            this.userService.saveUser(this.user).subscribe(success => {
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

    nextTab() {
        if (this.currentTabOpen > 4) { return false; }

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

        const progressBar = this.postProgressBar.nativeElement;

        switch (this.currentTabOpen) {
            case 1:
                break;

            case 2:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postBackBtn.nativeElement.classList.remove('d-none');
                break;

            case 3:
            // case 4:
            case 4:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                break;

            case 5:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postNextBtn.nativeElement.classList.add('d-none');
                this.postPostBtn.nativeElement.classList.remove('d-none');
                break;

            default:
               break;
        }

    }

    previousTab() {
        // Close current Tab
        const currentTabId = `#register-step-${this.currentTabOpen}`;

        $(currentTabId).removeClass('active');
        $(currentTabId).addClass('fade');
        $(currentTabId).addClass('d-none');

        // Increment To Next Tab
        this.currentTabOpen--;

        // Open Next Tab
        const nextTabId = `#register-step-${this.currentTabOpen}`;

        $(nextTabId).addClass('active');
        $(nextTabId).removeClass('fade');
        $(nextTabId).removeClass('d-none');

        switch (this.currentTabOpen) {

            case 1:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postBackBtn.nativeElement.classList.add('d-none');
                break;

            case 2:
            // case 3:
            case 3:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                break;

            case 4:
                this.postProgressBar.nativeElement.style.width = `${this.percentage[this.currentTabOpen]}%`;
                this.postProgressText.nativeElement.innerHTML = `${this.percentage[this.currentTabOpen]}%`;
                this.postNextBtn.nativeElement.classList.remove('d-none');
                this.postPostBtn.nativeElement.classList.add('d-none');
                break;

            default:
                break;
        }

    }

    handleFileInput(files: FileList) {
        Array.from(files).forEach(async file => {
            const base64 = await this.imageFileToBase64(file);
            this.photoImg.nativeElement.src = base64;
            this.user.photo = {
                filename: file.name,
                photo: base64.toString(),
                filetype: ImageFilType['image/png']
            };
        });
    }

    imageFileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

}

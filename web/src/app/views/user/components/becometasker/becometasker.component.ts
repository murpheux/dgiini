import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../models/user';
import { IProfile } from '../../models/profile';
import { IVendor } from '../../models/vendor';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserValidator } from 'src/app/views/tasks/models/Validators/UserValidator';
import { range } from 'rxjs';
import { toArray, take } from 'rxjs/operators';
import { IPhoto, ImageFilType } from 'src/app/views/tasks/models/IPhoto';

@Component({
    selector: 'app-becometasker',
    templateUrl: './becometasker.component.html',
    styleUrls: ['./becometasker.component.scss'],
})
export class BecometaskerComponent implements OnInit {
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
    autoYearList: number[];
    photos: IPhoto[] = [];

    mouseoverSave = false;
    percentage = [25, 50, 75, 100];
    banks = ['bmo', 'scotia', 'td', 'rbc', 'simpli', 'cibc', 'tangerine', 'hsbc'];
    vehicleBrands = ['honda', 'toyota', 'ford', 'chevrolet', 'acura', 'infiniti', 'dogde', 'ram'];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<BecometaskerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IProfile
    ) {}

    ngOnInit(): void {
        this.initializeContent();
        this.buildForm();
    }

    initializeContent(): void {
        const year = (new Date()).getFullYear();

        range(year - 20, 21)
            .pipe(toArray())
            .subscribe(rng => {
                this.autoYearList = rng.reverse();
            });
    }

    buildForm(): void {
        this.activeStepIndex = 0;
        const currentYear = (new Date()).getFullYear();

        this.userForm = this.formBuilder.group({
            subUserForms: this.formBuilder.array([
                this.formBuilder.group({
                    accountNo: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(50),
                    ]),
                    bankName: this.formBuilder.control('', [
                        Validators.required,
                        Validators.maxLength(50),
                    ]),
                    transitNo: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    insitutionNo: this.formBuilder.control(currentYear, [
                        Validators.required,
                    ]),
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
                    cardno: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(50),
                    ]),
                    nameoncard: this.formBuilder.control('', [
                        Validators.required,
                        Validators.maxLength(50),
                    ]),
                    expiry: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    cv2: this.formBuilder.control(currentYear),
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
                    brand: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    model: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    year: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
                this.formBuilder.group({
                    summary: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    skill: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    qualification: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
                this.formBuilder.group({
                    sin: this.formBuilder.control('', [
                        Validators.required,
                    ])
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

        const vendor: IVendor = {
            _id: this.user._id,
            name: formValues.subUserForms[0].name,
            username: this.user.username,
            email: this.user.username,
            phone: formValues.subUserForms[0].phone,
            role: this.user.role,
        };

        console.log(JSON.stringify(vendor));

        const validator = new UserValidator();
        const result = validator.validate(vendor);

        if (result.isValid) {
            this.userService.upgradeClient(vendor).subscribe(success => {
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

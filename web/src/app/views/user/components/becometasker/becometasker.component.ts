import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { range } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ImageFilType, IPhoto } from 'src/app/views/tasks/models/photo';
import { UserValidator } from 'src/app/views/tasks/models/Validators/UserValidator';
import { IProfile } from '../../models/profile';
import { IUser } from '../../models/user';
import { IVehicle } from '../../models/vehicle';
import { IVendor } from '../../models/vendor';
import { UserService } from '../../services/user.service';

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
    currentUser: IUser;
    activeStepIndex: number;
    autoYearList: number[];
    photos: IPhoto[] = [];
    selectedSkills: string[] = [];

    mouseoverSave = false;
    percentage = [12, 20, 35, 45, 50, 65, 75, 90, 100];
    banks = ['bmo', 'scotia', 'td', 'rbc', 'simpli', 'cibc', 'tangerine', 'hsbc'];
    vehicleBrands = [];
    skills = ['capentry', 'welder', 'childcare', 'babysitter', 'mover', 'sweeper'];
    vehicles: {[key: string]: string[]} = {
        honda: ['civic', 'city', 'accord'],
        toyota: ['corolla', 'camry', 'sienna', 'avalon', 'venza'],
        ford: ['fussion', 'freestar'],
        chevrolet: ['trax'],
        acura: ['legend', 'mdx', 'rdx', 'tlx', 'ilx', 'rlx'],
    };
    vehicleModels: string[][] = [];
    vehicleList: IVehicle[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private notifier: NotificationService,
        public dialogRef: MatDialogRef<BecometaskerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IProfile
    ) {}

    ngOnInit(): void {
        this.initializeContent();
        this.buildForm();

        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });

        this.vehicleBrands = Object.keys(this.vehicles);
        this.vehicleList.push({brand: '', model: '', year: ''});
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
                    skillSummary: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(1000),
                    ]),
                }),
                this.formBuilder.group({
                    website: this.formBuilder.control('', []),
                    facebook: this.formBuilder.control('', []),
                    twitter: this.formBuilder.control('', []),
                    linkedin: this.formBuilder.control('', []),
                }),
                this.formBuilder.group({
                    accountNo: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(10),
                    ]),
                    bankName: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                    transitNo: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(5)
                    ]),
                    insitutionNo: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(3)
                    ])
                }),
                this.formBuilder.group({
                    bkstreet: this.formBuilder.control('', [Validators.required]),
                    bkcity: this.formBuilder.control('Calgary', [
                        Validators.required,
                    ]),
                    bkstate: this.formBuilder.control('AB', [
                        Validators.required,
                    ]),
                    bkcountry: this.formBuilder.control('Canada', [
                        Validators.required,
                    ]),
                    bkzipcode: this.formBuilder.control('', [
                        Validators.required,
                    ])
                }),
                this.formBuilder.group({
                    cardno: this.formBuilder.control('', [
                        Validators.required,
                        Validators.minLength(12),
                        Validators.maxLength(16),
                    ]),
                    nameoncard: this.formBuilder.control('', [
                        Validators.required,
                        Validators.maxLength(40),
                    ]),
                    expiry: this.formBuilder.control('', [
                        Validators.required,
                    ])
                }),
                this.formBuilder.group({
                    ccstreet: this.formBuilder.control('', [Validators.required]),
                    cccity: this.formBuilder.control('Calgary', [
                        Validators.required,
                    ]),
                    ccstate: this.formBuilder.control('AB', [
                        Validators.required,
                    ]),
                    cccountry: this.formBuilder.control('Canada', [
                        Validators.required,
                    ]),
                    cczipcode: this.formBuilder.control('', [
                        Validators.required,
                    ]),
                }),
                this.formBuilder.group({    // dummy - photos
                }),
                this.formBuilder.group({    // dummy - vehicles
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
            _id: this.currentUser._id,
            username: this.currentUser.username,
            role: this.currentUser.role,
            skill_summary: formValues.subUserForms[0].skillSummary,
            skills: this.selectedSkills,
            social: {
                website: formValues.subUserForms[1].website,
                facebook: formValues.subUserForms[1].facebook,
                twitter: formValues.subUserForms[1].twitter,
                linkedin: formValues.subUserForms[1].linkedin,
            },
            bankAccount: {
                accountNo: formValues.subUserForms[2].accountno,
                bankName: formValues.subUserForms[2].bankName,
                transitNo: formValues.subUserForms[2].transitNo,
                insitutionNo: formValues.subUserForms[2].insitutionNo,
                address: {
                    street: formValues.subUserForms[3].bkstreet,
                    city: formValues.subUserForms[3].bkcity,
                    state: formValues.subUserForms[3].bkstate,
                    country: formValues.subUserForms[3].bkcountry,
                    zipcode: formValues.subUserForms[3].bkzipcode
                }
            },
            creditCard: {
                cardNumber: formValues.subUserForms[4].cardno,
                nameOnCard: formValues.subUserForms[4].nameoncard,
                expiry: formValues.subUserForms[4].expiry,
                billingAddress: {
                    street: formValues.subUserForms[5].ccstreet,
                    city: formValues.subUserForms[5].cccity,
                    state: formValues.subUserForms[5].ccstate,
                    country: formValues.subUserForms[5].cccountry,
                    zipcode: formValues.subUserForms[5].cczipcode
                }
            },
            jobDonePhotos: this.photos,
            vehicles: this.vehicleList
        };
        if (!vendor.role.includes('vendor')) {
            vendor.role.push('vendor'); // make vendor
        }

        const validator = new UserValidator();
        const result = validator.validate(vendor);

        if (result.isValid) {
            this.userService.upgradeClient(vendor).subscribe(_ => {
                this.notifier.showSuccess(
                    'User information saved successfully!'
                );
                this.dialogRef.close();
            });
        } else {
            const messages = result.getFailureMessages();
            this.notifier.showWarning(
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

    hideForm(form: string): void {
        $(form).removeClass('active');
        $(form).addClass('fade');
        $(form).addClass('d-none');
    }

    showForm(form: string): void {
        $(form).addClass('active');
        $(form).removeClass('fade');
        $(form).removeClass('d-none');
    }

    nextTab(): boolean {
        if (this.currentTabOpen > 9) {
            return false;
        }

        const currentTab = this.currentTabOpen;
        const currentTabId = `#become-tasker-step-${this.currentTabOpen}`;

        // Close current Tab
        this.hideForm(currentTabId);
        // Increment To Next Tab
        this.currentTabOpen++;

        // Open Next Tab
        const newTabId = `#become-tasker-step-${this.currentTabOpen}`;
        this.showForm(newTabId);

        this.postProgressBar.nativeElement.style.width = `${
            this.percentage[currentTab]
        }%`;
        this.postProgressText.nativeElement.innerHTML = `${
            this.percentage[currentTab]
        }%`;

        switch (this.currentTabOpen) {
            case 2:
                this.postBackBtn.nativeElement.classList.remove('d-none');
                break;

            case 9:
                this.postNextBtn.nativeElement.classList.add('d-none');
                this.postPostBtn.nativeElement.classList.remove('d-none');
                break;

            default:
                break;
        }
    }

    previousTab(): void {
        // Close current Tab
        const currentTabId = `#become-tasker-step-${this.currentTabOpen}`;

        this.hideForm(currentTabId);

        // Decrement To Next Tab
        this.currentTabOpen--;

        // Open Next Tab
        let currentTab = this.currentTabOpen;
        currentTab--;
        const nextTabId = `#become-tasker-step-${this.currentTabOpen}`;

        this.showForm(nextTabId);

        this.postProgressBar.nativeElement.style.width = `${
            this.percentage[currentTab]
        }%`;
        this.postProgressText.nativeElement.innerHTML = `${
            this.percentage[currentTab]
        }%`;

        switch (this.currentTabOpen) {
            case 1:
                this.postBackBtn.nativeElement.classList.add('d-none');
                break;

            case 8:
                this.postNextBtn.nativeElement.classList.remove('d-none');
                this.postPostBtn.nativeElement.classList.add('d-none');
                break;

            default:
                break;
        }
    }

    removeUpload(index: number): void {
        this.photos.splice(index, 1);
    }

    onSelectSkill(event): void {
        const val = event.currentTarget.innerText;

        if (this.selectedSkills.includes(val)) {
            $(event.currentTarget).removeClass('badge-primary');
            $(event.currentTarget).addClass('badge-secondary');

            const i = this.selectedSkills.indexOf(val);
            this.selectedSkills.splice(i, 1);
        } else {
            $(event.currentTarget).removeClass('badge-secondary');
            $(event.currentTarget).addClass('badge-primary');

            this.selectedSkills.push(val);
        }
    }

    getVehicleModel(event, index): void {
        this.vehicleModels[index] = this.vehicles[event.currentTarget.value];
        this.vehicleList[index].brand = event.currentTarget.value;
    }

    addVehicle(): void {
        this.vehicleList.push({brand: '', model: '', year: ''});
    }

    deleteVehicle(index: number): void {
        this.vehicleList.splice(index, 1);
    }

    setModelValue(event, index: number): void {
        this.vehicleList[index].model = event.currentTarget.value;
    }

    setYearValue(event, index: number): void {
        this.vehicleList[index].year = event.currentTarget.value;
    }
}

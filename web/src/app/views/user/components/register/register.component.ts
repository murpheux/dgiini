import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUser, IClient, Client, CreditCard } from '../../models/user';
import { Address } from '../../../tasks/models/IAddress';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.dirty && form.invalid;
    }
  }

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

    registerStep1FormGroup: FormGroup;
    registerStep2FormGroup: FormGroup;
    registerStep3FormGroup: FormGroup;

    errorMatcher = new CrossFieldErrorMatcher();
    model: IClient;

    constructor(
        private formBuilder: FormBuilder,
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
        this.model = new Client();
        this.model.address = new Address();
        this.model.creditCard = new CreditCard();
    }

    buildForms() {
        this.registerStep1FormGroup = this.formBuilder.group({
            'id': this.formBuilder.control(this.model._id),
            'username': this.formBuilder.control(this.model.username,
                [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
            'password': this.formBuilder.control(this.model.password,
                [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
            'confirmpassword': this.formBuilder.control(this.model.password,
                [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
        }, { validator: this.passwordValidator });

        this.registerStep2FormGroup = this.formBuilder.group({
            'street': this.formBuilder.control(this.model.address.street, [Validators.required]),
            'city': this.formBuilder.control(this.model.address.city, [Validators.required]),
            'zipcode': this.formBuilder.control(this.model.address.zipcode, [Validators.required]),
            'state': this.formBuilder.control(this.model.address.state, [Validators.required]),
            'country': this.formBuilder.control(this.model.address.country, [Validators.required])
        });

        this.registerStep3FormGroup = this.formBuilder.group({
            'cardNumber': this.formBuilder.control(this.model.creditCard.cardNumber, [Validators.required]),
            'nameOnCard': this.formBuilder.control(this.model.creditCard.nameOnCard, [Validators.required]),
            'expiry': this.formBuilder.control(this.model.creditCard.expiry, [Validators.required]),
            'cv2': this.formBuilder.control(this.model.creditCard.cv2,
                [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
        });
    }

    passwordValidator(form: FormGroup) {
        const condition = form.get('password').value !== form.get('confirmpassword').value;
        return condition ? { passwordsDoNotMatch: true } : null;
    }

    save() {
    }
}

import { Stakeholder } from './../../models/stakeholder';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StakeholderService } from '../../services/stakeholder.service';
import { StakeholderViewModel } from '../../models/stakeholder-view-model';
import { Country } from 'src/app/views/projects/models/country';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  formGroup: FormGroup;
  stakeholderFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  countries: Country[];

  model: StakeholderViewModel;
  salutations: string[];

  steps = [
    {
      label: 'Enter stakeholder information',
      content: 'Stakeholder Information.'
    },
    { label: 'Enter address', content: 'Address' },
    { label: 'You are now done', content: 'Finished!' }
  ];

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: StakeholderService,
    private router: Router
  ) {
    this.initializeContent();
    this.buildForms();
  }

  initializeContent() {
    this.model = new StakeholderViewModel();

    this.salutations = ['Mr', 'Mrs', 'Miss', 'Master', 'Messrs'];

    this.service.getCountriesList().subscribe((result: any) => {
      this.countries = <Country[]>result.data;
    });
  }

  buildForms() {
    this.stakeholderFormGroup = this.formBuilder.group({
      accountid: this.formBuilder.control(this.model.stakeholder.accountid, [
        Validators.required
      ]),
      salutation: this.formBuilder.control(this.model.stakeholder.salutation, [
        Validators.required
      ]),
      firstname: this.formBuilder.control(this.model.stakeholder.firstname, [
        Validators.required
      ]),
      lastname: this.formBuilder.control(this.model.stakeholder.lastname, [
        Validators.required
      ]),
      middlename: this.formBuilder.control(this.model.stakeholder.middlename, [
        Validators.required
      ]),
      email: this.formBuilder.control(this.model.stakeholder.email, [
        Validators.required
      ]),
      phone: this.formBuilder.control(this.model.stakeholder.phone, [
        Validators.required
      ]),
      fax: this.formBuilder.control(this.model.stakeholder.fax, [
        // Validators.required
      ])
    });

    this.addressFormGroup = this.formBuilder.group({
      address1: this.formBuilder.control(
        this.model.stakeholder.address.address1,
        [Validators.required]
      ),
      address2: this.formBuilder.control(
        this.model.stakeholder.address.address2,
        [Validators.required]
      ),
      city: this.formBuilder.control(this.model.stakeholder.address.city, [
        Validators.required
      ]),
      country_code: this.formBuilder.control(
        this.model.stakeholder.address.country_code,
        [Validators.required]
      ),
      country: this.formBuilder.control(
        this.model.stakeholder.address.country,
        [Validators.required]
      ),
      state_province: this.formBuilder.control(
        this.model.stakeholder.address.state_province,
        [Validators.required]
      ),
      state_postal_zip_codeprovince: this.formBuilder.control(
        this.model.stakeholder.address.postal_zip_code,
        [Validators.required]
      )
    });

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.stakeholderFormGroup,
        this.addressFormGroup
      ])
    });
  }

  ngOnInit() {}

  handleCancel() {
    this.router.navigate(['stakeholders']);
  }

  handleBack() {
    this.router.navigate(['stakeholders']);
  }

  handleUpdateStakeholder() {
    this.model.stakeholder.accountid = this.stakeholderFormGroup.value.accountid;
    this.model.stakeholder.salutation = this.stakeholderFormGroup.value.salutation;
    this.model.stakeholder.firstname = this.stakeholderFormGroup.value.firstname;
    this.model.stakeholder.middlename = this.stakeholderFormGroup.value.middlename;
    this.model.stakeholder.lastname = this.stakeholderFormGroup.value.lastname;
    this.model.stakeholder.email = this.stakeholderFormGroup.value.email;
    this.model.stakeholder.phone = this.stakeholderFormGroup.value.phone;
    this.model.stakeholder.fax = this.stakeholderFormGroup.value.fax;

    this.service.saveStakeholder(this.model).subscribe(d => {
      this.model = null;
      this.router.navigate(['stakeholders']);
    });
  }
}

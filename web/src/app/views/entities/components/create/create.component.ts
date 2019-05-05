import { Component, OnInit } from '@angular/core';
import { Region } from '../../models/region';
import { Country } from '../../models/country';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EntityViewModel } from '../../models/entity-view-model';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { EntityType } from '../../models/entityType';
import { IndustryType } from '../../models/industryType';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EntityService } from '../../services/entity.service';
import { Address } from '../../models/address';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UrlConfig } from 'src/app/shared/models/url-config';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  countryControl = new FormControl();
  regionControl = new FormControl();
  entityDetailsFormGroup: FormGroup;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  regions: Region[];
  countries: Country[];
  filteredCountries: Country[];
  entityTypes: EntityType[];
  industryTypes: IndustryType[];
  selectedCountry: Country;
  dataSource: ResponseResult;
  isEditMode: boolean;
  isSameMailingAddress: boolean;
  isLoading: boolean;
  model: EntityViewModel ;

  mockServer = UrlConfig.POSTMAN_MOCK_API;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {
    this.initializeContent();
    this.buildForm();
  }

  ngOnInit() {}

  initializeContent() {
    this.model = new EntityViewModel();
    this.isSameMailingAddress = false;
    this.isLoading = false;

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;

        this.httpService.getEntityById(id).subscribe((result: any) => {
          this.model = <EntityViewModel> result.data;
        });
      } else {
        this.isEditMode = false;
      }
    });

    this.httpService.getRegionList().subscribe((result: ResponseResult) => {
        this.regions = result.data;
      });

    this.httpService.getCountriesList().subscribe((result: ResponseResult) => {
        this.countries = result.data;
      });

    this.httpService.getEntityTypeList().subscribe((result: ResponseResult) => {
        this.entityTypes = result.data;
      });

    this.httpService.getIndustryTypeList().subscribe((result: ResponseResult) => {
        this.industryTypes = result.data;
      });
  }

  buildForm() {
    this.entityDetailsFormGroup = this.formBuilder.group({
      entityName: this.formBuilder.control(this.model.entity.name, [Validators.required]),
      entityAcronym: this.formBuilder.control(this.model.entity.acronym, [Validators.required]),
      countryId: this.formBuilder.control(this.model.entity.countryId, [Validators.required]),
      regionId: this.formBuilder.control(this.model.entity.regionId, [ Validators.required]),
      entityTypeId: this.formBuilder.control(this.model.entity.entityTypeId, [ Validators.required]),
      industryTypeId: this.formBuilder.control(this.model.entity.industryTypeId, [ Validators.required]),
      comments: this.formBuilder.control(this.model.entity.description, [ Validators.nullValidator]),

      address: this.formBuilder.group({
        addressLine1: this.formBuilder.control(this.model.entity.address.line1, [Validators.required]),
        addressLine2: this.formBuilder.control(this.model.entity.address.line2, [Validators.nullValidator]),
        addressCity : this.formBuilder.control(this.model.entity.address.city, [Validators.nullValidator]),
        addressPostalCode: this.formBuilder.control(this.model.entity.address.postalcode, [Validators.nullValidator]),
        addressStateOrProvince: this.formBuilder.control(this.model.entity.address.stateOrProvince, [Validators.nullValidator])
      }),

      mailingAddress: this.formBuilder.group({
        mailaddressLine1: this.formBuilder.control(this.model.entity.mailingAddress.line1, [Validators.required]),
        mailaddressLine2: this.formBuilder.control(this.model.entity.mailingAddress.line2, [Validators.nullValidator]),
        mailaddressCity : this.formBuilder.control(this.model.entity.mailingAddress.city, [Validators.nullValidator]),
        mailaddressPostalCode: this.formBuilder.control(this.model.entity.mailingAddress.postalcode, [Validators.nullValidator]),
        mailaddressStateOrProvince: this.formBuilder.control(this.model.entity.mailingAddress.stateOrProvince, [Validators.nullValidator]),
      })
    });
  }

  handleCancel() {
    this.navigateToList();
  }

  create() {

    if (!this.entityDetailsFormGroup.valid) {
       return;
    }

    this.isLoading = true;

    this.setCountry();

    this.httpService.post(this.model).subscribe((result: any) => {
        if (typeof result.data && result.data) {
          this.navigateToList();
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
   }

   update() {
    if (!this.entityDetailsFormGroup.valid) {
       return;
    }
    this.isLoading = true;

    this.setCountry();

    this.httpService.put(this.model).subscribe((result: any) => {
        if (result.statusCode === 200) {
          this.navigateToList();
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
   }

  private setCountry() {
    if (this.model.entity.countryId) {
      const country = this.countries.find(c => {
        return c.id === +this.model.entity.countryId;
      });
      if (country) {
        this.model.entity.country = country.name;
        this.model.entity.address.country = country.name;
        this.model.entity.mailingAddress.country = country.name;
      }
    }
  }

   handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  navigateToList() {
    this.router.navigate(['entities']);
  }

   onSameAddressChanged() {
     this.isSameMailingAddress = !this.isSameMailingAddress;
      if (this.isSameMailingAddress) {
        this.model.entity.mailingAddress = this.model.entity.address;
      } else {
        this.model.entity.mailingAddress = new Address();
      }
   }
  onRegionSelect(regionId) {
    if (regionId > 0) {
      this.filteredCountries = this.countries.filter(
        item => item.regionId === +regionId
      );
    }
  }

  openConfirmationDialog(id: string) {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete entity '${this.model.entity.name}'`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.handleDelete(id);
      } else {
        this.dialogRef = null;
      }
    });
  }

  handleDelete(id: string) {
    this.isLoading = true;
    this.httpService.deleteEntity(id).subscribe((result: any) => {
      if (result.statusCode === 200) {
        this.navigateToList();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
}

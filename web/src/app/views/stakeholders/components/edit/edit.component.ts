import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StakeholderService } from '../../services/stakeholder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { StakeholderViewModel } from '../../models/stakeholder-view-model';
import { DeleteStakeholderDialogComponent } from './delete-dialog/delete-stakeholder-dialog.component';

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteStakeholderDialogComponent>;
  stakeholderDetailsFormGroup: FormGroup;
  model: StakeholderViewModel;
  salutations: string[];

  constructor(
    private formBuilder: FormBuilder,
    private service: StakeholderService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.initializeContent();
  }

  ngOnInit() {}

  initializeContent() {
    this.model = new StakeholderViewModel();

    this.salutations = ["Mr", "Mrs", "Miss", "Master", "Messrs"];

    this.route.params.subscribe(params => {
      const code = params["id"];

      this.service.getStakeholderByAccountId(code).subscribe((result: any) => {
        this.model = <StakeholderViewModel>result.data;

        this.stakeholderDetailsFormGroup = this.formBuilder.group({
          accountid: this.formBuilder.control(
            { value: this.model.stakeholder.accountid, disabled: true },
            [Validators.required]
          ),
          salutation: this.formBuilder.control(
            this.model.stakeholder.salutation,
            [Validators.required]
          ),
          firstname: this.formBuilder.control(
            this.model.stakeholder.firstname,
            [Validators.required]
          ),
          middlename: this.formBuilder.control(
            this.model.stakeholder.middlename,
            [Validators.required]
          ),
          lastname: this.formBuilder.control(this.model.stakeholder.lastname, [
            Validators.required
          ]),
          email: this.formBuilder.control(this.model.stakeholder.email, [
            Validators.required
          ]),
          phone: this.formBuilder.control(this.model.stakeholder.phone, [
            Validators.required
          ]),
          fax: this.formBuilder.control(this.model.stakeholder.fax, [
            Validators.required
          ]),
          role: this.formBuilder.control(this.model.stakeholder.role, [
            Validators.required
          ])
        });
      });
    });
  }

  handleUpdateStakeholder() {
    this.model.stakeholder.salutation = this.stakeholderDetailsFormGroup.value.salutation;
    this.model.stakeholder.firstname = this.stakeholderDetailsFormGroup.value.firstname;
    this.model.stakeholder.middlename = this.stakeholderDetailsFormGroup.value.middlename;
    this.model.stakeholder.lastname = this.stakeholderDetailsFormGroup.value.lastname;
    this.model.stakeholder.email = this.stakeholderDetailsFormGroup.value.email;
    this.model.stakeholder.phone = this.stakeholderDetailsFormGroup.value.phone;
    this.model.stakeholder.fax = this.stakeholderDetailsFormGroup.value.fax;

    this.service.saveStakeholder(this.model).subscribe(d => {
      this.model = null;
      this.router.navigate(["stakeholders"]);
    });
  }

  handleBack() {
    this.model = null;

    this.router.navigate(["stakeholders"]);
  }

  handleDelete(accountid: string) {
    this.service.deleteStakeholder(accountid).subscribe(result => {});
    this.router.navigate(["stakeholders"]);
  }

  openConfirmationDialog(code: string) {
    this.dialogRef = this.dialog.open(DeleteStakeholderDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete stakeholder '${
      this.model.stakeholder.accountid
    }' ?`;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDelete(code);
      } else {
        this.dialogRef = null;
      }
    });
  }
}

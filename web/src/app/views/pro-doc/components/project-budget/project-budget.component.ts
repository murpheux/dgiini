import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ProjectBudgetModel } from "../../models/project-budget-model";
import { BudgetService } from '../../services/budget.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-project-budget",
  templateUrl: "./project-budget.component.html",
  styleUrls: ["./project-budget.component.scss"]
})
export class ProjectBudgetComponent implements OnInit {
  budgetDetailsFormGroup: FormGroup;
  model: ProjectBudgetModel;

  constructor(
    private formBuilder: FormBuilder,
    private service: BudgetService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.initializeContent();
  }

  ngOnInit() { }

  initializeContent() {
    this.model = new ProjectBudgetModel();

    this.populateBudget();
  }

  populateBudget() {
    this.route.params.subscribe(params => {
      const code = params["code"];

      this.service.getBudgetByCode(code).subscribe((result: any) => {
        this.model = result.data as ProjectBudgetModel;

        this.budgetDetailsFormGroup = this.formBuilder.group({
          id: this.formBuilder.control(
            { value: this.model.id, disabled: false }
          ),
          budget_code: this.formBuilder.control(
            { value: this.model.code, disabled: true },
            [Validators.required]
          ),
          amount: this.formBuilder.control(this.model.amount, [
            Validators.required
          ]),
          duration: this.formBuilder.control(this.model.duration, [
            Validators.required
          ]),
          overheadrate: this.formBuilder.control(this.model.overheadRate, [
            Validators.required
          ])
        });
      });
    });
  }

  handleCancel() {
    this.model = null;

    this.populateBudget();
  }

  handleSave(isProceed: boolean) {
    const budget = this.budgetDetailsFormGroup.value;
    let message = 'budget has been ';

    budget.id = this.model.id;
    budget.projectCode = this.model.projectCode;
    budget.code = this.model.code;

    if (budget.id === 0) {
      this.service.saveBudget(budget).subscribe(result => {
        message += 'saved successfully';
        this.toastr.success(message, 'saved');
      });
    } else {
      this.service.updateBudget(budget).subscribe(result => {
        message += 'updated successfully';
        this.toastr.success(message, 'saved');
      });
    }

  }
}

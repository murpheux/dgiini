import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ProjectResourceModel } from "../../models/project-resource-model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-project-resources",
  templateUrl: "./project-resources.component.html",
  styleUrls: ["./project-resources.component.scss"]
})
export class ProjectResourcesComponent implements OnInit {
  projectresourceFormGroup: FormGroup;
  model: ProjectResourceModel;
  periods: string[] = ["Short", "Long"];

  constructor(
    private formBuilder: FormBuilder,
    private service: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.initializeContent();
  }

  ngOnInit() { }

  initializeContent() {
    this.model = new ProjectResourceModel();

    this.populateResource();
  }

  populateResource() {

    this.route.params.subscribe(params => {
      const code = params["code"];

      this.service.getResourceByCode(code).subscribe((result: any) => {
        this.model = result.data as ProjectResourceModel;

        this.projectresourceFormGroup = this.formBuilder.group({
          id: this.formBuilder.control(
            { value: this.model.id, disabled: true },
            [Validators.required]
          ),
          entityname: this.formBuilder.control(this.model.entityName, [
            Validators.required
          ]),
          period: this.formBuilder.control(this.model.period, [
            Validators.required
          ]),
          description: this.formBuilder.control(this.model.description, [
            Validators.required
          ])
        });
      });
    });
  }

  handleCancel() {
    this.model = null;

    this.populateResource();
  }

  handleSave(isProceed: boolean) {
    const resource = this.projectresourceFormGroup.value;
    let message = 'resource has been ';

    resource.id = this.model.id;
    resource.projectCode = this.model.projectCode;
    resource.code = this.model.entityName;

    if (resource.id === 0) {
      this.service.saveResource(resource).subscribe(result => {
        message += 'saved successfully';
        this.toastr.success(message, 'saved');
      });
    } else {
      this.service.updateResource(resource).subscribe(result => {
        message += 'updated successfully';
        this.toastr.success(message, 'saved');
      });
    }

  }
}

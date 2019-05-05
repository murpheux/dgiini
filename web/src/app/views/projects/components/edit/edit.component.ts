import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country';
import { Region } from '../../models/region';
import { Area } from '../../models/area';
import { StrategicObjective } from '../../models/strategic-objective';
import { ProjectType } from '../../models/project-type';
import { TypeOfProject } from '../../models/type-of-project';
import { ProjectService } from '../../services/project.service';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ProjectViewModel } from '../../models/project-view-model';
import { Entity } from '../../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteProjectDialogComponent } from './delete-dialog/delete-project-dialog.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit  {
  dialogRef: MatDialogRef<DeleteProjectDialogComponent>;
  projectDetailsFormGroup: FormGroup;
  isOptional = false;
  isLoaded = false;
  areas = [];
  strategicObjectives = [];
  countries: Country[];
  durationUnits: any[];
  regions: Region[];
  entities: Entity[];
  projectTypes: ProjectType[];
  typeOfProjects: TypeOfProject[];
  model: ProjectViewModel;

  constructor(private formBuilder: FormBuilder, private service: ProjectService,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.entities =  [ {id: 1, name: 'ICAO'} , {id: 2, name: 'abc'}];

    this.initializeContent();
  }

  ngOnInit() {

  }
  initializeContent() {
    this.model = new ProjectViewModel();
    this.model.areas = [];
    this.model.strategicObjectives = [];

    this.route.params.subscribe(params => {
      const code = params['id'];

      this.service.getProjectByCode(code).subscribe((result: any) => {
        this.model = <ProjectViewModel> result.data;
        this.projectDetailsFormGroup = this.formBuilder.group({
          'code': this.formBuilder.control({value: this.model.project.code, disabled: true},
            [
              Validators.required
            ]),
          'title': this.formBuilder.control(this.model.project.title,
              [
                Validators.required
            ]),
          'projectTypeId': this.formBuilder.control(this.model.project.projectTypeId,
            [
              Validators.required
          ]),
          'expectedStartDate': this.formBuilder.control(this.model.project.expectedStartDate,
           [
             Validators.required
           ]),
           'executingAgencyId': this.formBuilder.control(this.model.project.executingAgencyId,
            [
              Validators.required
            ]),
           'implementingAgencyId': this.formBuilder.control(this.model.project.implementingAgencyId,
            [
               Validators.required
            ]),
            'estimatedDuration': this.formBuilder.control(this.model.project.estimatedDuration,
            [
                Validators.required
            ]),
            'durationUnit': this.formBuilder.control(this.model.project.implementingAgencyId,
            [
                Validators.required
            ]),
            'outline': this.formBuilder.control(this.model.project.outline,
            [
                Validators.required
            ]),
            'areas': this.buildAreas(this.model.project.areas),
            'strategicObjectives':  this.buildStrategicObjectives(this.model.project.strategicObjectives)
        });
      });
    });

    this.service.getProjectDurationUnits().subscribe((result: any) => {
      this.durationUnits = result.data;
    });

    this.service.getTypeOfProjectsList().subscribe((result: any) => {
      this.typeOfProjects =  <TypeOfProject[]>result.data;
    });

    this.service.getProjectTypesList().subscribe((result: any) => {
      this.projectTypes =  <ProjectType[]>result.data;
    });
  }

  buildAreas(areas: Area[]) {
    const arr = areas.map(area => {
      return this.formBuilder.control(area.isChecked);
    });
    return this.formBuilder.array(arr);
}

  buildStrategicObjectives(strategicObjectives: StrategicObjective[]) {
    const arr =  strategicObjectives.map(so => {
      return this.formBuilder.control(so.isChecked);
    });
    return this.formBuilder.array(arr);
  }

  handleUpdateProject() {

    this.model.project.title = this.projectDetailsFormGroup.value.title;
    this.model.project.expectedStartDate = this.projectDetailsFormGroup.value.expectedStartDate;
    this.model.project.implementingAgencyId = this.projectDetailsFormGroup.value.implementingAgencyId;
    this.model.project.executingAgencyId = this.projectDetailsFormGroup.value.executingAgencyId;
    this.model.project.durationUnit = this.projectDetailsFormGroup.value.durationUnit;
    this.model.project.estimatedDuration = this.projectDetailsFormGroup.value.estimatedDuration;
    this.model.project.outline = this.projectDetailsFormGroup.value.outline;
    this.model.project.projectTypeId = this.projectDetailsFormGroup.value.projectTypeId;

     this.projectDetailsFormGroup.value.areas.forEach((area, index) => {
        this.model.project.areas[index].isChecked = area;
    });
     this.projectDetailsFormGroup.value.strategicObjectives.forEach((strategicObjective, index) => {
       this.model.project.strategicObjectives[index].isChecked = strategicObjective;
     });
     this.service.updateProject(+this.model.project.id, this.model).subscribe(d => {
      this.model = null;
      this.router.navigate(['projects']);
     });
  }

  handleBack() {
    this.model = null;

    this.router.navigate(['projects']);
  }


  handleDelete(code: string) {
    this.service.deleteProject(code).subscribe(result => {

    });
    this.router.navigate(['projects']);
  }

  get getAreas(): FormArray {
    return this.projectDetailsFormGroup
    .get('areas') as FormArray;
  }

  get getStrategicObjectives(): FormArray {
    return this.projectDetailsFormGroup
    .get('strategicObjectives') as FormArray;
  }

  openConfirmationDialog(code: string) {
    this.dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete project '${this.model.project.code}' ?`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.handleDelete(code);
      } else {
        this.dialogRef = null;
      }
    });
  }
}

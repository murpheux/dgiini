import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Country } from '../../models/country';
import { Region } from '../../models/region';
import { Area } from '../../models/area';
import { StrategicObjective } from '../../models/strategic-objective';
import { ProjectType } from '../../models/project-type';
import { TypeOfProject } from '../../models/type-of-project';
import { ProjectService } from '../../services/project.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import { ProjectViewModel } from '../../models/project-view-model';
import { Entity } from '../../models/entity';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, AfterViewInit {

  locationFormGroup: FormGroup;
  projectDetailsFormGroup: FormGroup;
  isOptional = false;
  isLoaded = false;
  countries: Country[];
  durationUnits: any[];
  regions: Region[];
  entities: Entity[];
  projectTypes: ProjectType[];
  typeOfProjects: TypeOfProject[];
  model: ProjectViewModel;

  constructor(private formBuilder: FormBuilder, private service: ProjectService, private router: Router, private cd: ChangeDetectorRef) {
    this.entities =  [ {id: 1, name: 'ICAO'} , {id: 2, name: 'abc'}];

    this.initializeContent();

    this.buildForms();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.cd.detectChanges();
 }

  initializeContent() {
    this.model = new ProjectViewModel();
    this.model.areas = [];
    this.model.strategicObjectives = [];

    this.service.getProjectDurationUnits().subscribe((result: any) => {
      this.durationUnits = result.data;
    });

    this.service.getRegionsList().subscribe((result: any) => {
      this.regions = <Region[]>result.data;
    });

    this.service.getCountriesList().subscribe((result: any) => {
      this.countries =  <Country[]>result.data;
    });

    this.service.getTypeOfProjectsList().subscribe((result: any) => {
      this.typeOfProjects =  <TypeOfProject[]>result.data;
    });

    this.service.getProjectTypesList().subscribe((result: any) => {
      this.projectTypes =  <ProjectType[]>result.data;
    });
  }

  buildForms() {
    this.locationFormGroup = this.formBuilder.group({
      'regionId': this.formBuilder.control(this.model.project.regionId,
        [
          Validators.required
        ]),
      'countryId': this.formBuilder.control(this.model.project.countryId,
        [
          Validators.required
        ]),
      'typeOfProjectId': this.formBuilder.control(this.model.project.typeOfProjectId,
        [
          Validators.required
        ])
    });

  }

  handleCancel() {
    this.router.navigate(['projects']);
  }
  generateProject() {
    this.service
    .generateProjectCode(this.model.project.regionId, this.model.project.countryId, this.model.project.typeOfProjectId)
    .subscribe((result: any) => {
      this.model.project.code = result.data;
    });
  }

  handleLocationFormGroup() {
    this.model.project.regionId = this.locationFormGroup.value.regionId;
    this.model.project.countryId = this.locationFormGroup.value.countryId;
    this.model.project.typeOfProjectId = this.locationFormGroup.value.typeOfProjectId;

    this.service.saveProject(this.model).subscribe((result: any) => {
      this.model.project.id = result.data.project.id;
      this.model.project.code = result.data.project.code;
      this.model.project.areas = result.data.project.areas;
      this.model.project.strategicObjectives = result.data.project.strategicObjectives;
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
          'strategicObjectives': this.buildStrategicObjectives(this.model.project.strategicObjectives)
        });
    });
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

  get getAreas(): FormArray {
    return this.projectDetailsFormGroup
    .get('areas') as FormArray;
  }

  get getStrategicObjectives(): FormArray {
    return this.projectDetailsFormGroup
    .get('strategicObjectives') as FormArray;
  }

  onRegionChanged(regionId: number) {
    if (regionId) {
      this.service.getCountriesByRegion(regionId).subscribe((result: any) => {
        this.countries =  <Country[]>result.data;
      });
    }
  }
}

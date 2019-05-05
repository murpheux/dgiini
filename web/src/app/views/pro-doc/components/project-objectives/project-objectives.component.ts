import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProjectObjectiveModel } from '../../models/project-objective-model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectObjective } from '../../models/project-objective';
import { ProjectDeliverable } from '../../models/project-deliverable';
import { ProjectActivity } from '../../models/project-activity';
import { PerformanceIndicator } from '../../models/performance-indicator';
import { ObjectiveService } from '../../services/objective.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-project-objectives',
  templateUrl: './project-objectives.component.html',
  styleUrls: ['./project-objectives.component.scss']
})
export class ProjectObjectivesComponent implements OnInit {

  @Input() projectCode: string;

  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  model: ProjectObjectiveModel;
  isUpdate = true;
  durationUnits: any[];
  constructor(private fb: FormBuilder, private service: ObjectiveService,
      public dialog: MatDialog, private toastr: ToastrService, public loadingService: LoadingService) { }

  projectObjectivesform: FormGroup;

  formErrors = {
    objectives: this.objectivesErrors()
  };

  validationMessages = {
    objectives: {
      title: {
        required: 'objective title is required.'
      },
      performanceIndicators: {
        title: {
          required: 'performance Indicator title is required.'
        }
      },
      deliverables: {
        title: {
          required: 'deliverable title is required.'
        },
        activities: {
          title: { required: 'activity title is required.' },
          estimatedStartDate: { required : 'estimated start date is required' },
          duration:   { required : 'duration is required' },
          durationUnit:  { required : 'duration Unit is required' },
          responsible:  { required : 'responsible is required' },
        }
      }
  }
};

  ngOnInit() {
    this.service.getProjectDurationUnits().subscribe((units: any) => {
      this.durationUnits = units.data;
    });

    this.populateObjective();

  }

  populateObjective() {
    this.service.getObjective(this.projectCode).subscribe((result: any) => {
      this.model =  result.data;
      if (this.model && this.model.objectives.length > 0) {
        this.projectObjectivesform = this.fb.group({
          'objectives': this.buildObjectives(this.model.objectives)
         });
      } else {
        this.model = new ProjectObjectiveModel();
        this.model.projectCode = this.projectCode;
        this.model.objectives = [];
        this.isUpdate = false;
        this.projectObjectivesform = this.fb.group({
          'objectives': this.fb.array([
            this.initObjectives()
          ])
        });
      }
      this.reArrangeSequences();
      this.projectObjectivesform.valueChanges.subscribe(data => {
        this.validateForm();
      });
      this.validateForm();

    });
  }

  initObjectives() {
    return this.fb.group({
      'id': 0,
      'title': null,
      'projectCode': this.projectCode,
      'orderNo': null,
      'sequenceNo': null,
      'deliverables': this.fb.array([
        this.initDeliverables()
      ]),
      'performanceIndicators': this.fb.array([
        this.initPerformanceIndicators()
      ])
    });
    this.reArrangeSequences();
  }

  buildObjectives(objectives: ProjectObjective[]): FormArray {
    const arr = objectives.map(objective => {
      return this.fb.group({
        'id': objective.id,
        'projectCode': objective.projectCode,
        'title': objective.title,
        'orderNo': objective.orderNo,
        'sequenceNo': objective.sequenceNo,
        'deliverables': this.buildDeliverables(objective.deliverables),
        'performanceIndicators':  this.buildPerformanceIndicators(objective.performanceIndicators)
      });
    });
    return this.fb.array(arr);
  }

  buildPerformanceIndicators(performanceIndicators: PerformanceIndicator[]): FormArray  {
    const arr = performanceIndicators.map(performanceIndicator => {
    return this.fb.group({
      'id': performanceIndicator.id,
      'title': performanceIndicator.title
    });
  });
  return this.fb.array(arr);
  }

  buildDeliverables(deliverables: ProjectDeliverable[]): FormArray  {
    const arr = deliverables.map(deliverable => {
    return this.fb.group({
      'id': deliverable.id,
      'title': deliverable.title,
      'orderNo': deliverable.orderNo,
      'sequenceNo': deliverable.sequenceNo,
      'activities': this.buildActivities(deliverable.activities)
    });
  });
  return this.fb.array(arr);
  }

  buildActivities(activities: ProjectActivity[]): FormArray  {
    const arr = activities.map(activity => {
    return this.fb.group({
      'id': activity.id,
      'title': activity.title,
      'sequenceNo': [{value: activity.sequenceNo, readonly: true}],
      'orderNo': activity.orderNo,
      'estimatedStartDate': activity.estimatedStartDate,
      'duration': activity.duration,
      'durationUnit': activity.durationUnit,
      'responsible': activity.responsible
    });
  });
  return this.fb.array(arr);
  }

  addObjective() {
    const control = <FormArray>this.projectObjectivesform.controls['objectives'];
    control.push(this.initObjectives());
    this.reArrangeSequences();
  }

  deleteObjective(indexToDelete) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage =
    `Are you sure you want to delete objective '${indexToDelete + 1}
    ' and all of it's performance indicators, deliverables and activities ?`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const control = (<FormArray>this.projectObjectivesform.controls['objectives']) as FormArray;
        control.removeAt(indexToDelete);
        this.reArrangeSequences();
      } else {
        this.dialogRef = null;
      }
    });
  }

  initPerformanceIndicators() {
    return this.fb.group({
      'id': 0,
      'title': null
    });
  }

  addPerformanceIndicator(objectiveIndex) {
    const control = (<FormArray>this.projectObjectivesform.controls['objectives'])
    .at(objectiveIndex).get('performanceIndicators') as FormArray;
    control.push(this.initPerformanceIndicators());
  }

  deletePerformanceIndicator(objectiveIndex, indexToDelete) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage =
    `Are you sure you want to Performance Indicator '${objectiveIndex + 1}.${indexToDelete + 1}' ?`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const control = (<FormArray>this.projectObjectivesform.controls['objectives'])
        .at(objectiveIndex).get('performanceIndicators') as FormArray;
        control.removeAt(indexToDelete);
      } else {
        this.dialogRef = null;
      }
    });
  }

  initDeliverables() {
    return this.fb.group({
      'id': 0,
      'sequenceNo': null,
      'orderNo': null,
      'title': null,
      'activities': this.fb.array([
        this.initActivities()
      ])
    });
  }

  addDeliverable(objectiveIndex) {
    const control = (<FormArray>this.projectObjectivesform.controls['objectives']).at(objectiveIndex).get('deliverables') as FormArray;
    control.push(this.initDeliverables());
    this.reArrangeSequences();
  }

  deleteDeliverable(objectiveIndex, indexToDelete) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage =
    `Are you sure you want to Deliverables '${objectiveIndex + 1}.${indexToDelete + 1}' and all of it's activities?`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const control = (<FormArray>this.projectObjectivesform.controls['objectives']).at(objectiveIndex).get('deliverables') as FormArray;
        control.removeAt(indexToDelete);
        this.reArrangeSequences();
      } else {
        this.dialogRef = null;
      }
    });
  }

  initActivities() {
    return this.fb.group({
      'id': 0,
      'title': null,
      'sequenceNo': [{value: null, readonly: true}],
      'orderNo': null,
      'estimatedStartDate': null,
      'duration': null,
      'durationUnit': null,
      'responsible': null
    });
  }

  addActivity(objectiveIndex, deliverableIndex) {
    const control = ((<FormArray>this.projectObjectivesform.controls['objectives'])
    .at(objectiveIndex).get('deliverables') as FormArray).at(deliverableIndex).get('activities') as FormArray;
    control.push(this.initActivities());
    this.reArrangeSequences();
  }

  deleteActivity(objectiveIndex, deliverableIndex, indexToDelete) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage =
    `Are you sure you want to delete activity '${objectiveIndex + 1}.${deliverableIndex + 1}.${indexToDelete + 1}' ?`;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const control = ((<FormArray>this.projectObjectivesform.controls['objectives'])
    .at(objectiveIndex).get('deliverables') as FormArray).at(deliverableIndex).get('activities') as FormArray;
    control.removeAt(indexToDelete);
    this.reArrangeSequences();
      } else {
        this.dialogRef = null;
      }
    });
  }

  reArrangeSequences() {
    const objectives = ((<FormArray>this.projectObjectivesform.controls['objectives']));
    objectives.controls.map((o, io) => {
        const objectiveIndex = io + 1;
        o.patchValue({sequenceNo: `${objectiveIndex}`});
        o.patchValue({orderNo: +`${io}`});
        const deliverables = ((<FormArray>this.projectObjectivesform.controls['objectives'])
                             .at(io).get('deliverables') as FormArray);
        deliverables.controls.map((d, id) => {
          const deliverableIndex = id + 1;
          d.patchValue({sequenceNo: `${objectiveIndex}.${deliverableIndex}`});
          d.patchValue({orderNo: +`${id}`});
          const activities = ((<FormArray>this.projectObjectivesform.controls['objectives'])
                          .at(io).get('deliverables') as FormArray)
                          .at(id).get('activities') as FormArray;
          activities.controls.map((a, ia) => {
            const activityIndex = ia + 1;
            a.patchValue({sequenceNo: `${objectiveIndex}.${deliverableIndex}.${activityIndex}`});
            a.patchValue({orderNo: +`${ia}`});
          });
        });
    });
  }

  objectivesErrors() {
    return [{
      'title': '',
      'performanceIndicators': this.performanceIndicatorsErrors(),
      'deliverables': this.deliverablesErrors()
    }];
  }

  performanceIndicatorsErrors() {
    return [{
      'title': ''
    }];
  }

  deliverablesErrors() {
    return [{
      'title': '',
      'activities': this.activitiesErrors()
    }];
  }

  activitiesErrors() {
    return [{
      'title': '',
      'estimatedStartDate': '',
      'duration': '',
      'durationUnit': '',
      'responsible': ''
    }];
  }

  // form validation
  validateForm() {
    this.validateObjectives();
  }

  validateObjectives() {
    const objectivesArray = <FormArray>this.projectObjectivesform['controls'].objectives;
    this.formErrors.objectives = [];
    let index = 1;
    while (index <= objectivesArray.length) {
      this.formErrors.objectives.push({
        title: '',
        performanceIndicators: [{
          title: '',
        }],
        deliverables: [{
          title: '',
          activities: [{
            title: '',
            estimatedStartDate: '',
            duration: '',
            durationUnit: '',
            responsible: ''
          }]
        }]
      });
      const objective = <FormGroup>objectivesArray.at(index - 1);
      for (const field in objective.controls) {
        const input = objective.get(field);
        if (input.invalid && input.dirty) {
          for (const error in input.errors) {
            this.formErrors.objectives[index - 1][field] = this.validationMessages.objectives[field][error];
          }
        }
      }
      this.validatePerformanceIndicator(index);
      this.validateDeliverables(index);
      index++;
    }

  }

  validatePerformanceIndicator(objectiveIndex) {
    const performanceIndicatorsArray =
    (<FormArray>this.projectObjectivesform.controls['objectives']).at(objectiveIndex - 1).get('performanceIndicators') as FormArray;
    this.formErrors.objectives[objectiveIndex - 1].performanceIndicators = [];
    let index = 1;
    while (index <= performanceIndicatorsArray.length) {
      this.formErrors.objectives[objectiveIndex - 1].performanceIndicators.push({
        title: ''
      });
      const performanceIndicator = <FormGroup>performanceIndicatorsArray.at(index - 1);
      for (const field in performanceIndicator.controls) {
        const input = performanceIndicator.get(field);
        if (input.invalid && input.dirty) {
          for (const error in input.errors) {
            this.formErrors.objectives[objectiveIndex - 1].performanceIndicators[index - 1][field] =
            this.validationMessages.objectives.performanceIndicators[field][error];
          }
        }
      }
      index++;
    }
  }

  validateDeliverables(objectiveIndex) {
    const deliverablesArray =
    (<FormArray>this.projectObjectivesform.controls['objectives']).at(objectiveIndex - 1).get('deliverables') as FormArray;
    this.formErrors.objectives[objectiveIndex - 1].deliverables = [];
    let index = 1;
    while (index <= deliverablesArray.length) {
      this.formErrors.objectives[objectiveIndex - 1].deliverables.push({
        title: '',
        activities: [{
          title: '',
          estimatedStartDate: '',
          duration: '',
          durationUnit: '',
          responsible: ''
        }]
      });
      const deliverable = <FormGroup>deliverablesArray.at(index - 1);
      for (const field in deliverable.controls) {
        const input = deliverable.get(field);
        if (input.invalid && input.dirty) {
          for (const error in input.errors) {
            this.formErrors.objectives[objectiveIndex - 1].deliverables[index - 1][field] =
            this.validationMessages.objectives.deliverables[field][error];
          }
        }
      }

      this.validateActivities(objectiveIndex, index);
      index++;
    }
  }

  validateActivities(objectiveIndex, deliverableIndex) {
    const activitiesArray = ((<FormArray>this.projectObjectivesform.controls['objectives'])
    .at(objectiveIndex - 1).get('deliverables') as FormArray).at(deliverableIndex - 1).get('activities') as FormArray;
    this.formErrors.objectives[objectiveIndex - 1].deliverables[deliverableIndex - 1].activities = [];
    let index = 1;
    while (index <= activitiesArray.length) {
      this.formErrors.objectives[objectiveIndex - 1].deliverables[deliverableIndex - 1].activities.push({
        title: '',
        estimatedStartDate: '',
        duration: '',
        durationUnit: '',
        responsible: ''
      });
      const activity = <FormGroup>activitiesArray.at(index - 1);
      for (const field in activity.controls) {
        const input = activity.get(field);
        if (input.invalid && input.dirty) {
          for (const error in input.errors) {
            this.formErrors.objectives[objectiveIndex - 1].deliverables[deliverableIndex - 1].activities[index - 1][field] =
            this.validationMessages.objectives.deliverables.activities[field][error];
          }
        }
      }
      index++;
    }
  }

  handleCancel() {
    this.model = null;
    this.populateObjective();
  }

  handleSave(isProceed: boolean) {
    const objectives =  this.projectObjectivesform.value.objectives;
    this.service.updateBulk(objectives).subscribe(result => {
      this.toastr.success(`project objectives have been updated successfully`);
    });
  }

  dropActivity(event: CdkDragDrop<ProjectActivity[]>, objectiveIndex, deliverableIndex) {

    const newActivities = event.previousContainer.data.map(x => Object.assign({}, x));

    const temp = newActivities[event.previousIndex];
    newActivities[event.previousIndex] = newActivities[event.currentIndex];
    newActivities[event.currentIndex] = temp;

    const deliverable = ((<FormArray>this.projectObjectivesform.controls['objectives'])
        .at(objectiveIndex).get('deliverables') as FormArray).at(deliverableIndex);
        deliverable.patchValue({activities: newActivities});
      this.reArrangeSequences();
  }

  dropDeliverable(event: CdkDragDrop<ProjectDeliverable[]>, objectiveIndex) {

    const objective = (<FormArray>this.projectObjectivesform.controls['objectives'])
                      .at(objectiveIndex);

    const newDeliverables = event.previousContainer.data.map(x => Object.assign({}, x));

      const temp = newDeliverables[event.previousIndex];

      newDeliverables[event.previousIndex] = newDeliverables[event.currentIndex];

      newDeliverables[event.currentIndex] = temp;

      this.clearFormArray(<FormArray>objective.get('deliverables'));

      const deliverables = this.buildDeliverables(newDeliverables);

      deliverables.controls.forEach(element => {
        (<FormArray>objective.get('deliverables')).push(element);
      });

      this.reArrangeSequences();
  }

  dropObjective(event: CdkDragDrop<ProjectObjective[]>) {

    const newObjectives = event.previousContainer.data.map(x => Object.assign({}, x));

      const temp = newObjectives[event.previousIndex];

      newObjectives[event.previousIndex] = newObjectives[event.currentIndex];

      newObjectives[event.currentIndex] = temp;

      this.clearFormArray(<FormArray>this.projectObjectivesform.controls['objectives']);

      const objectives = this.buildObjectives(newObjectives);


      objectives.controls.forEach(element => {
         (<FormArray>this.projectObjectivesform.controls['objectives']).push(element);
      });

      this.reArrangeSequences();
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}

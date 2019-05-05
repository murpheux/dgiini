import { ContextService } from './../../services/context.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Constants } from 'src/app/shared/models/constants';
import { Context } from '../../models/context';
import { ContextType } from '../../models/context-type';

@Component({
  selector: 'app-project-context',
  templateUrl: './project-context.component.html',
  styleUrls: ['./project-context.component.scss']
})
export class ProjectContextComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  projectcontextFormGroup: FormGroup;
  model: Context[];
  isUpdate = true;

  background_type = Constants.PRODOC_CONTEXT_BACKGROUND_TYPE;
  scope_type = Constants.PRODOC_CONTEXT_SCOPE_TYPE;
  strategy_type = Constants.PRODOC_CONTEXT_STRATEGY_TYPE;
  background_desc = Constants.PRODOC_CONTEXT_BACKGROUND_DESC;
  scope_desc = Constants.PRODOC_CONTEXT_SCOPE_DESC;
  strategy_desc = Constants.PRODOC_CONTEXT_STRATEGY_DESC;
  sections = [
    {'name': this.background_type, 'label': this.background_desc},
    {'name': this.scope_type, 'label': this.scope_desc},
    {'name': this.strategy_type, 'label': this.strategy_desc}
  ];
   mapNameToId = new Map();
  projectCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ContextService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.projectCode = params['code'];
    });
  }

  ngOnInit() {
    this.model = [];
    this.populateContext();
  }

  private populateContext(): void {

      this.service.getProjectContextsByCode(this.projectCode).subscribe((result: any) => {
        this.model = result.data.contexts as Context[];
        const types = result.data.contextTypes as ContextType[];
        this.buildMapping(types);
        if (this.model && this.model.length > 0 ) {
          this.projectcontextFormGroup = this.formBuilder.group({
            'background': this.buildContents(this.model, this.background_type),
            'scope': this.buildContents(this.model, this.scope_type),
            'strategy': this.buildContents(this.model, this.strategy_type),
          });
        } else {
          this.model = [];
          this.isUpdate = false;
          this.projectcontextFormGroup = this.formBuilder.group({
            'background': this.formBuilder.array([this.initContents()]),
            'scope': this.formBuilder.array([this.initContents()]),
            'strategy': this.formBuilder.array([this.initContents()])
          });
        }
        this.reArrangeContentOrders(this.background_type);
        this.reArrangeContentOrders(this.scope_type);
        this.reArrangeContentOrders(this.strategy_type);
      });

  }

  buildContents(model: Context[], section: string): FormArray {
    const contents = model.filter(c => c.type === this.mapNameToId.get(section.toLowerCase()));
    return this.buildContentUnit(contents);
  }
  buildContentUnit(contexts: Context[]): FormArray {
    const sortedArray = contexts.sort((sec1, sec2) => {
      if (sec1.orderNo > sec2.orderNo) {
        return 1;
      } else if (sec1.orderNo < sec2.orderNo) {
        return -1;
      } else {
        return 0;
      }
    });
    const array = contexts.map(content => {
      return this.formBuilder.group({
        'id': content.id,
        'title': new FormControl(content.title,  [Validators.required]),
        'orderNo': new FormControl({value: content.orderNo, disabled: true}),
      });
    });
    return this.formBuilder.array(array);
  }
  initContents() {
    return this.formBuilder.group({
      'id': 0,
      'title': new FormControl(null,  [Validators.required]),
      'orderNo': new FormControl({ value: null, disabled: true})
    });
  }
  addContent(section: string): void {
    const sections = <FormArray>this.projectcontextFormGroup.controls[section];
    sections.push(this.initContents());
    this.reArrangeContentOrders(section);
  }

  deleteContent(indexToDelete: number, section: string): void {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {disableClose: false });
    this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to delete this bacground ?`;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const control = <FormArray>this.projectcontextFormGroup.controls[section];
        control.removeAt(indexToDelete);
        if ( control.length === 0) {
          this.addContent(section);
        } else {
          this.reArrangeContentOrders(section);
        }
      } else {
        this.dialogRef = null;
      }
    });
  }

  private reArrangeContentOrders(section: string): void {
    const sections = <FormArray>this.projectcontextFormGroup.controls[section];
    sections.controls.map((s, is) => {
      s.patchValue({orderNo: `${is + 1}`});
    });
  }

  dropContent(event: CdkDragDrop<Context[]>, section: string) {

    const newObjectives = event.previousContainer.data.map(x => Object.assign({}, x));

      const temp = newObjectives[event.previousIndex];

      newObjectives[event.previousIndex] = newObjectives[event.currentIndex];

      newObjectives[event.currentIndex] = temp;

      this.clearFormArray(<FormArray>this.projectcontextFormGroup.controls[section]);

      const contents = this.buildContentUnit(newObjectives);

      contents.controls.forEach(element => {
         (<FormArray>this.projectcontextFormGroup.controls[section]).push(element);
      });

      this.reArrangeContentOrders(section);
  }
  handleCancel() {
    this.model = null;

    this.populateContext();
  }

  handleSave() {
    const newContexts: Context[] = [];
    this.sections.forEach( section => {
      const tmpValues: any[] = this.projectcontextFormGroup.getRawValue()[section.name.toLowerCase()];
      tmpValues.forEach( value => {
        const context = new Context();
        context.id = value.id;
        context.orderNo = value.orderNo;
        context.projectCode = this.projectCode;
        context.title = value.title;
        context.type = this.mapNameToId.get(section.name.toLowerCase());

        newContexts.push(context);
      });
    });

    this.service.updateBulk(newContexts).subscribe(result => {
        this.toastr.success(`contexts have been updated successfully`);
    });
  }
  private buildMapping(types: ContextType[]): void {
    if (types && types.length > 0 ) {
      types.forEach(t => {
        this.mapNameToId.set(t.name.toLowerCase(), t.id);
      });
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}

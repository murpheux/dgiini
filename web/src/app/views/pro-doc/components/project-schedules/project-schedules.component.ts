import { Component, OnInit } from '@angular/core';
import { ProDocService } from '../../services/pro-doc.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectScheduleModel } from '../../models/project-schedule-model.';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-schedules',
  templateUrl: './project-schedules.component.html',
  styleUrls: ['./project-schedules.component.scss']
})
export class ProjectSchedulesComponent implements OnInit {

  projectSchedule: ProjectScheduleModel;
  responseMessage: string;
  numberOfWeeks: number;
  projectCode: string;
  constructor(private route: ActivatedRoute, private prodocService: ProDocService, private toastr: ToastrService) {

    this.route.params.subscribe(params => {
      this.projectCode  = params['code'];
    });
  }

  ngOnInit() {
    this.prodocService.getScheduleByCode(this.projectCode).subscribe((result: any) => {

      if(result.data) {
       const tmpProjectSchedule: ProjectScheduleModel = <ProjectScheduleModel>result.data ;
       this.numberOfWeeks = tmpProjectSchedule.numberOfWeeks;
       this.projectSchedule = tmpProjectSchedule;
      } else {
        this.projectSchedule = new ProjectScheduleModel();
        this.projectSchedule.projectCode = this.projectCode;
      }
  });
}

  save() {

    this.projectSchedule.numberOfWeeks = this.numberOfWeeks;

    if (!this.projectSchedule.id) {
      this.prodocService.createSchedule(this.projectSchedule).subscribe((result: any) => {
        if ( typeof result.data && result.data ) {
          this.projectSchedule = <ProjectScheduleModel>result.data;
          this.toastr.success( 'schedule has been created ', 'created');
        } else {
          this.responseMessage = 'failed to create this schedule ' + result.errorMessage;
        }
      });

    } else {
      this.prodocService.updateSchedule(this.projectSchedule, this.projectSchedule.id).subscribe((result: any) => {
        if ( typeof result.data && result.data ) {
          this.toastr.success( 'schedule has been updated ', 'updated');
        } else {
          this.responseMessage = 'failed to update this schedule ' + result.errorMessage;
        }
      });
  }

  }
  handleCancel() {
    this.numberOfWeeks = null ;
  }
}

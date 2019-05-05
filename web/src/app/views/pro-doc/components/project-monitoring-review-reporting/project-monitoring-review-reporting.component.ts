import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProDocService } from '../../services/pro-doc.service';
import { ProjectMonitoringModel } from '../../models/project-monitoring-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-monitoring-review-reporting',
  templateUrl: './project-monitoring-review-reporting.component.html',
  styleUrls: ['./project-monitoring-review-reporting.component.scss']
})

export class ProjectMonitoringReviewReportingComponent implements OnInit {
  projectMonitoring: ProjectMonitoringModel;
  responseMessage: string;
  numberOfWeeks: number;
  numberOfMonths: number;
  reportDate: Date;
  projectCode: string;

  constructor(private route: ActivatedRoute, private prodocService: ProDocService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
      this.projectCode  = params['code'];
    });
  }

  ngOnInit() {
    this.prodocService.getMonitoringByCode(this.projectCode).subscribe((result: any) => {

      if(result.data) {
       const tmpProjectMonitoring: ProjectMonitoringModel = <ProjectMonitoringModel>result.data ;
       this.numberOfWeeks = tmpProjectMonitoring.numberOfWeeks;
       this.numberOfMonths = tmpProjectMonitoring.numberOfMonths;
       this.reportDate = tmpProjectMonitoring.reportDate;
       this.projectMonitoring = tmpProjectMonitoring;
      } else {
        this.projectMonitoring = new ProjectMonitoringModel();
        this.projectMonitoring.projectCode = this.projectCode;
      }
  });
}

  save() {
    this.projectMonitoring.numberOfMonths = this.numberOfMonths;
    this.projectMonitoring.numberOfWeeks = this.numberOfWeeks;
    this.projectMonitoring.reportDate = this.reportDate;

    if (!this.projectMonitoring.id) {
      this.prodocService.createMonitoring(this.projectMonitoring).subscribe((result: any) => {
        if ( typeof result.data && result.data ) {
          this.projectMonitoring = <ProjectMonitoringModel>result.data ;
          this.toastr.success( 'monitoring has been created ', 'created');
        } else {
          this.responseMessage = 'failed to create this monitoring ' + result.errorMessage;
        }
      });

    } else {
      this.prodocService.updateMonitoring(this.projectMonitoring, this.projectMonitoring.id).subscribe((result: any) => {
        if ( typeof result.data && result.data ) {
          this.toastr.success( 'monitoring has been updated ', 'updated');
        } else {
          this.responseMessage = 'failed to update this monitoring ' + result.errorMessage;
        }
      });
  }

  }
  handleCancel() {
    this.numberOfWeeks = null ;
    this.numberOfMonths = null;
    this.reportDate = null;
  }
}

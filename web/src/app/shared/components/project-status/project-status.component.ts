import { Component, OnInit, Input } from '@angular/core';
import { ProjectStatus } from '../../models/project-status';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {
  @Input() projectCode: string;
  constructor() { }
  emptyStatus = {
    projectCode: '',
    statuses:
    [
      { name: 'PDU Start', orderNo: 15 , percentage: 0, completed: true },
      { name: 'Budget Request', orderNo: 20 , percentage: 30, completed: false },
      { name: 'FPS Input', orderNo: 25 , percentage: 30, completed: false },
      { name: 'BSS Input', orderNo: 26 , percentage: 30, completed: false },
      { name: 'Project Appraisal', orderNo: 27 , percentage: 30, completed: false },
      { name: 'Proposal Sent to Client', orderNo: 30 , percentage: 50, completed: false },
      { name: 'Signature ICAO', orderNo: 35 , percentage: 50, completed: false },
      { name: 'Signature Client', orderNo: 36 , percentage: 50, completed: false },
      { name: 'Note for File', orderNo: 40 , percentage: 70, completed: false },
      { name: 'Agresso', orderNo: 45 , percentage: 70, completed: false },
      { name: 'Ack. Funds', orderNo: 46 , percentage: 70, completed: false },
      { name: 'Handover', orderNo: 50 , percentage: 100, completed: false }
    ]
  };

  projectStatuses: ProjectStatus[] = [{
    projectCode: 'BOL19801',
    statuses:
    [
      { name: 'PDU Start', orderNo: 15 , percentage: 0, completed: true },
      { name: 'Budget Request', orderNo: 20 , percentage: 30, completed: false },
      { name: 'FPS Input', orderNo: 25 , percentage: 30, completed: false },
      { name: 'BSS Input', orderNo: 26 , percentage: 30, completed: false },
      { name: 'Project Appraisal', orderNo: 27 , percentage: 30, completed: false },
      { name: 'Proposal Sent to Client', orderNo: 30 , percentage: 50, completed: false },
      { name: 'Signature ICAO', orderNo: 35 , percentage: 50, completed: false },
      { name: 'Signature Client', orderNo: 36 , percentage: 50, completed: false },
      { name: 'Note for File', orderNo: 40 , percentage: 70, completed: false },
      { name: 'Agresso', orderNo: 45 , percentage: 70, completed: false },
      { name: 'Ack. Funds', orderNo: 46 , percentage: 70, completed: false },
      { name: 'Handover', orderNo: 50 , percentage: 100, completed: false }
    ]
  },
  {
    projectCode: 'EGY19801' ,
    statuses:
    [
      { name: 'PDU Start', orderNo: 15 , percentage: 0, completed: true },
      { name: 'Budget Request', orderNo: 20 , percentage: 30, completed: true },
      { name: 'FPS Input', orderNo: 25 , percentage: 30, completed: true },
      { name: 'BSS Input', orderNo: 26 , percentage: 30, completed: true },
      { name: 'Project Appraisal', orderNo: 27 , percentage: 30, completed: true },
      { name: 'Proposal Sent to Client', orderNo: 30 , percentage: 50, completed: true },
      { name: 'Signature ICAO', orderNo: 35 , percentage: 50, completed: true },
      { name: 'Signature Client', orderNo: 36 , percentage: 50, completed: false },
      { name: 'Note for File', orderNo: 40 , percentage: 70, completed: false },
      { name: 'Agresso', orderNo: 45 , percentage: 70, completed: false },
      { name: 'Ack. Funds', orderNo: 46 , percentage: 70, completed: false },
      { name: 'Handover', orderNo: 50 , percentage: 100, completed: false }
    ]
}];
  currentProjectStatus: ProjectStatus;
  ngOnInit() {
    const result = this.currentProjectStatus = this.projectStatuses.filter(ps => {
      return ps.projectCode === this.projectCode;
    })[0];
    if (!result) {
      this.emptyStatus.projectCode = this.projectCode;
      this.currentProjectStatus = this.emptyStatus;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProjectLegalModel } from '../models/project-legal-model';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
  providedIn: 'root'
})
export class ProDocService {

  constructor(private http: HttpClient) { }

  getProjectDurationUnits() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/DurationUnits`);
  }

  getScheduleByCode(projectCode: string): any {
    return this.http
      .get(`${environment.DOMAIN}/${EndPoints.PRODOC_SCHEDULES}/projectcode/${projectCode}`);
  }
  updateSchedule(body: any, id: number): any {
    return this.http
      .put(`${environment.DOMAIN}/${EndPoints.PRODOC_SCHEDULES}/${id}`, body);
  }
  createSchedule(body: any): any {
    return this.http
      .post(`${environment.DOMAIN}/${EndPoints.PRODOC_SCHEDULES}`, body);
  }

  getMonitoringByCode(projectCode: string): any {
    return this.http
      .get(`${environment.DOMAIN}/${EndPoints.PRODOC_MONITORINGS}/projectcode/${projectCode}`);
  }
  updateMonitoring(body: any, id: number): any {
    return this.http
      .put(`${environment.DOMAIN}/${EndPoints.PRODOC_MONITORINGS}/${id}`, body);
  }
  createMonitoring(body: any): any {
    return this.http
      .post(`${environment.DOMAIN}/${EndPoints.PRODOC_MONITORINGS}`, body);
  }

  getLegalByCode(projectCode: string): any {
    return this.http
      .get(`${environment.DOMAIN}/${EndPoints.PRODOC_LEGALS}/projectcode/${projectCode}`);
  }
  updateLegal(body: ProjectLegalModel, id: number): any {
    return this.http
      .put(`${environment.DOMAIN}/${EndPoints.PRODOC_LEGALS}/${id}`, body);
  }
  createLegal(body: ProjectLegalModel): any {
    return this.http
      .post(`${environment.DOMAIN}/${EndPoints.PRODOC_LEGALS}`, body);
  }

  getProjectByCode(projectCode: string): any {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/code/${projectCode}`);
  }

}

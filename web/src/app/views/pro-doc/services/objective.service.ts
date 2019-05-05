import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProjectObjective } from '../models/project-objective';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(private http: HttpClient) {}

  getProjectDurationUnits() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/DurationUnits`);
  }

  getObjective(projectCode: string) {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PRODOC_PROJECTOBJECTIVES}/projectcode/${projectCode}`);
  }

  saveObjective(objective: ProjectObjective) {
    return this.http.post(`${environment.DOMAIN}/${EndPoints.PRODOC_PROJECTOBJECTIVES}`, objective);
  }

  updateObjective(id: number, objective: ProjectObjective) {
    return this.http.put(`${environment.DOMAIN}/${EndPoints.PRODOC_PROJECTOBJECTIVES}/${id}`, objective);
  }

  updateBulk(objectives: ProjectObjective[]) {
    return this.http.put(`${environment.DOMAIN}/${EndPoints.PRODOC_PROJECTOBJECTIVES}`, objectives);
  }
  deleteObjective(id: number) {
    return this.http.delete(`${environment.DOMAIN}/${EndPoints.PRODOC_PROJECTOBJECTIVES}/${id}`);
  }
}

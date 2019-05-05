import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectViewModel } from '../models/project-view-model';
import { Project } from '../models/project';
import { registerContentQuery } from '@angular/core/src/render3';
import { EndPoints } from 'src/app/shared/models/end-points';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private http: HttpClient) { }

  getRegionsList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_REGIONS}`);
  }

  getCountriesList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_COUNTRIES}`);
  }
  getCountriesByRegion(regionId) {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_COUNTRIES}/regionId/${regionId}`);
  }
  getTypeOfProjectsList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_TYPEOFPROJECTS}`);
  }

  getProjectTypesList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTTYPES}`);
  }

  getStrategicObjectivesList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_STRATEGICOBJECTIVES}`);
  }

  getAreasList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_AREAS}`);
  }

  getProjectLists() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}`);
  }

  getProjectByCode(projectCode: string): Observable<ProjectViewModel> {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/code/${projectCode}`).pipe(
      map((p: ProjectViewModel) => {
        return p;
      }));
  }

  getProjectDurationUnits() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/DurationUnits`);
  }

  generateProjectCode(region: number, country: number, typeOfProject: number) {
    const body = {'regionId': region, 'countryId': country, 'typeOfProjectId': typeOfProject};

    return this.http.post(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/projectCode`, body);
  }

  saveProject(viewModel: ProjectViewModel) {
    return this.http.post(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}`, viewModel);
  }

  updateProject(id: number, viewModel: ProjectViewModel) {
    return this.http.put(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/${id}`, viewModel);
  }

  deleteProject(code: string) {
    return this.http.delete(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_PROJECTS}/code/${code}`);
  }
}

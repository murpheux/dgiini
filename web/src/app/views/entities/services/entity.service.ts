import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  getList () {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITIES}`);
  }

  post(body: any): any {
    return this.http.post(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITIES}`, body);
  }

  put(body: any): any {
    return this.http.put<ResponseResult>(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITIES}`, body);
  }

  getEntityById(id: number) {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITIES}/${id}`);
  }

  getCountriesList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_COUNTRIES}`);
  }

  getRegionList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_REGIONS}`);
  }

  getEntityTypeList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITY_TYPES}`);
  }

  getIndustryTypeList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_INDUSTRY_TYPES}`);
  }

  deleteEntity(id) {
    return this.http.delete(`${environment.DOMAIN}/${EndPoints.CONTACT_MANAGEMENT_ENTITIES}/${id}`);
  }
}

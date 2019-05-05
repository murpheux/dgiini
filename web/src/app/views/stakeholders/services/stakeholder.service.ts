import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { StakeholderViewModel } from '../models/stakeholder-view-model';
import { PostmanConfig } from 'src/app/shared/models/postman-config';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {

  constructor(private http: HttpClient) { }

  getStakeholderLists() {
    return this.http.get(`${PostmanConfig.API_Stakeholder_BASE}`);
  }

  getCountriesList() {
    return this.http.get(`${environment.DOMAIN}/${EndPoints.PROJECT_FORMULATION_COUNTRIES}`);
  }

  saveStakeholder(viewModel: StakeholderViewModel) {
    return this.http.post(`${PostmanConfig.API_Stakeholder_BASE}`, viewModel);
  }

  getStakeholderByAccountId(accountid: string) {
    return this.http.get(`${PostmanConfig.API_Stakeholder_BASE}/id/${accountid}`);
  }

  deleteStakeholder(accountid: string) {
    return this.http.delete(`${PostmanConfig.API_Stakeholder_BASE}/id/${accountid}`);
  }
}

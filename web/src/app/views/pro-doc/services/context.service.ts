import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EndPoints } from 'src/app/shared/models/end-points';
import { Context } from '../models/context';

@Injectable({
    providedIn: 'root'
})
export class ContextService {

    constructor(private http: HttpClient) { }

    getProjectContextsByCode(projectCode: string) {
        return this.http
            .get(`${environment.DOMAIN}/${EndPoints.PRODOC_CONTEXTS}/projectcode/${projectCode}`);
    }

    updateBulk(contexts: Context[]): any {
      return this.http.put(`${environment.DOMAIN}/${EndPoints.PRODOC_CONTEXTS}`, contexts);
  }
}

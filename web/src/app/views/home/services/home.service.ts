import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EndPoints } from 'src/app/shared/models/end-points';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private serviceUrl = `${environment.DOMAIN}/${EndPoints.TASK_SERVICE}`;

    constructor(private http: HttpClient) { }

    getTaskCategories(): Observable<IResponse> {
        const url = `${this.serviceUrl}/categories`;
        return this.http.get<any>(url);
    }

    getTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<any>(url);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocationService } from '../../user/services/location.service';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { ITask } from '../../tasks/models/ITask';
import { EnvService } from 'src/app/shared/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class TaskerService {

    constructor(
        private env: EnvService,
        private http: HttpClient,
        private locationService: LocationService
    ) { }

    getFeaturedVendor(): Observable<IResponse> {
        const url = `${this.env.apiUrl}/auth/v1/users/role/tasker`;
        return this.http.get<IResponse>(url);
    }

    getRecommendedVendor(task: ITask): Observable<IResponse> {
        const url = `${this.env.apiUrl}/auth/v1/taskers/${task.category}`;
        return this.http.get<IResponse>(url);
    }
}

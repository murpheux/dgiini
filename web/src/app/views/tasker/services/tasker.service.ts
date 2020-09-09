import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { IResponse } from '../../tasks/models/response';
import { ITask } from '../../tasks/models/task';
import { LocationService } from '../../user/services/location.service';

@Injectable({
    providedIn: 'root',
})
export class TaskerService {
    constructor(
        private env: EnvService,
        private http: HttpClient,
        private locationService: LocationService
    ) {}

    getFeaturedVendor(): Observable<IResponse> {
        const url = `${this.env.apiUrl}/auth/v1/users/role/tasker`;
        return this.http.get<IResponse>(url);
    }

    getRecommendedVendor(task: ITask): Observable<IResponse> {
        const url = `${this.env.apiUrl}/auth/v1/taskers/${task.category}`;
        return this.http.get<IResponse>(url);
    }
}

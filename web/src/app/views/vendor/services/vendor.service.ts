import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocationService } from '../../user/services/location.service';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { ITask } from '../../tasks/models/ITask';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

    constructor(
        private http: HttpClient,
        private locationService: LocationService
    ) { }

    getFeaturedVendor(): Observable<IResponse> {
        const url = `${environment.gateway.api}/auth/v1/users/role/vendor`;
        return this.http.get<IResponse>(url);
    }

    getRecommendedVendor(task: ITask): Observable<IResponse> {
        const url = `${environment.gateway.api}/auth/v1/vendors/${task.category}`;
        return this.http.get<IResponse>(url);
    }
}

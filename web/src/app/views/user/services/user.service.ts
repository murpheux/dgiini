import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { EnvService } from 'src/app/shared/services/env.service';
import { IClient, IVendor } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private serviceUrl = undefined;

    constructor(private env: EnvService, private http: HttpClient) {
        this.serviceUrl = `${env.apiUrl}/auth/v1/users`;
    }

    saveClient(user: IClient): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, user);
    }

    upgradeClient(user: IVendor): Observable<IResponse> {
        const url = `${this.serviceUrl}/upgrade`;
        return this.http.post<IResponse>(url, user);
    }

    getUserByEmail(email: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/${email}`;
        return this.http.get<IResponse>(url);
    }

    getUserList(userids: Guid[]): Observable<IResponse> {
        const url = `${this.serviceUrl}?filter={"_id":[${userids.map(
            (u) => '"' + u + '"'
        )}]}`;
        return this.http.get<IResponse>(url);
    }

    getUserStatstics(): Observable<IResponse> {
        const url = `${this.serviceUrl}/stats/full`;
        return this.http.get<IResponse>(url);
    }
}

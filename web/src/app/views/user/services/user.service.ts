import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { IResponse } from '../../tasks/models/response';
import { IClient } from '../models/client';
import { IVendor } from '../models/vendor';

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
        const url = `${this.serviceUrl}/promote`;
        return this.http.put<IResponse>(url, user);
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

    getUserList2(userids: string[]): Observable<IResponse> {
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

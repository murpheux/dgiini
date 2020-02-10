import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private serviceUrl = `${environment.gateway.api}/auth/v1`;

    constructor(
        private http: HttpClient
    ) { }

    getUserByEmail(email: string): Observable<IResponse> {
        const url = `${environment.gateway.api}/auth/v1/users/${email}`;
        return this.http.get<IResponse>(url);
    }

    getUserList(userids: Guid[]): Observable<IResponse> {
        const url = `${this.serviceUrl}/users?filter={"_id":[${userids.map(u => '"' + u + '"')}]}`;
        return this.http.get<IResponse>(url);
    }

    getUserStatstics(): Observable<IResponse> {
        const url = `${this.serviceUrl}/users/stats/full`;
        return this.http.get<IResponse>(url);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { EnvService } from 'src/app/shared/services/env.service';
import { IUser } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private serviceUrl = undefined;

    constructor(private env: EnvService, private http: HttpClient) {
        this.serviceUrl = `${env.apiUrl}/auth/v1`;
    }

    saveUser(user: IUser): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, user);
    }

    getUserByEmail(email: string): Observable<IResponse> {
        const url = `${this.env.apiUrl}/auth/v1/users/${email}`;
        return this.http.get<IResponse>(url);
    }

    getUserList(userids: Guid[]): Observable<IResponse> {
        const url = `${this.serviceUrl}/users?filter={"_id":[${userids.map(
            (u) => '"' + u + '"'
        )}]}`;
        return this.http.get<IResponse>(url);
    }

    getUserStatstics(): Observable<IResponse> {
        const url = `${this.serviceUrl}/users/stats/full`;
        return this.http.get<IResponse>(url);
    }
}

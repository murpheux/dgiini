import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUserByEmail(email: string): Observable<IResponse> {
        const url = `${environment.gateway.api}/auth/v1/users/${email}`;
        return this.http.get<IResponse>(url);
    }
}

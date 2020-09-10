import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMail } from '../models/mail';
import { IResponse } from '../models/response';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

    private serviceUrl = undefined;

    constructor(
        private env: EnvService,
        private http: HttpClient,
    ) {
        this.serviceUrl = `${env.apiUrl}/notify/v1`;
    }

    sendMail(mail: IMail): Observable<IResponse> {
        const url = `${this.serviceUrl}/sendmail`;
        return this.http.post<IResponse>(url, mail);
    }
}

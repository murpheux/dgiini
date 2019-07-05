import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { IMessage } from '../models/message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private serviceUrl = `${environment.MSG_API}`;

    constructor(private http: HttpClient) { }

    sendMessage(message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, message);
    }

    getMessages(from: string): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }
}

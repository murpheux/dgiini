import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { IResponse } from '../../../shared/models/response';
import { UserService } from '../../user/services/user.service';
import { IMessage } from '../models/message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private serviceUrl = undefined;

    constructor(
        private env: EnvService,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.serviceUrl = `${env.apiUrl}/msg/v1/messages`;
    }

    getUserMessages(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/message/${id}`;
        return this.http.get<IResponse>(url);
    }

    getUserConversations(userid: Guid, taskid: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/task/${taskid}`;
        return this.http.get<IResponse>(url);
    }

    getMessagesFrom(from: Guid, task: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/message/${from}`;
        return this.http.get<IResponse>(url);
    }

    getMessagesFromTo(from: Guid, to: Guid, task: Guid): Observable<IResponse>{
        const url = `${this.serviceUrl}/message/${from}/${to}`;
        return this.http.get<IResponse>(url);
    }

    saveMessage(message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, message);
    }
}

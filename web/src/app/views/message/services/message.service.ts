import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { environment } from 'src/environments/environment';
import { IMessage } from '../models/message';
import { Guid } from 'guid-typescript';
import { AuthService } from '../../user/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private serviceUrl = `${environment.APIGW_API}/msg/v1/messages`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
        ) { }

    sendMessage(message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, message);
    }

    sendMessageForTask(message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}/task/${message.task}`;
        return this.http.post<IResponse>(url, message);
    }

    getMessages(from: string): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getUserTaskMessages(from: Guid, user: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/task/${from}/${user}`;
        return this.http.get<IResponse>(url);
    }

    getTaskMessages(from: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/task/${from}`;
        return this.http.get<IResponse>(url);
    }

    enrichMessages(messages: IMessage[]) {
        if (!messages) { return; }

        const userList = messages.map(m => m.from)
            .filter((value, index, self) => self.indexOf(value) === index);

        this.authService.getUserList(userList).subscribe(res => {
            messages.forEach(m => {
                res.payload.filter(user => {
                    m.from = m.from === user._id ? user : m.from;
                });
            });
        });
    }
}

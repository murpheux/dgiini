import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';
import { IMessage } from '../models/message';
import { Guid } from 'guid-typescript';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../user/services/user.service';
import { EnvService } from 'src/app/shared/services/env.service';
import { IUser } from '../../user/models/user';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private serviceUrl = undefined;

    constructor(
        private env: EnvService,
        private userService: UserService,
        private http: HttpClient
    ) {
        this.serviceUrl = `${env.apiUrl}/msg/v1/messages`;
    }

    sendMessage(message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, message);
    }

    sendMessageForTask(task: Guid, message: IMessage): Observable<IResponse> {
        const url = `${this.serviceUrl}/task/${task}`;
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

    enrichMessages(messages: IMessage[]): void {
        if (!messages) {
            return;
        }

        const userList = messages
            .map((m) => m.from)
            .filter((value, index, self) => self.indexOf(value) === index);

        if (userList) {
            this.userService.getUserList(userList).subscribe((res) => {
                messages.forEach((m) => {
                    res.payload.data.filter((user) => {
                        m.from = m.from === user._id ? user : m.from;
                    });
                });
            });
        }
    }
}

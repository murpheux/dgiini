import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EndPoints } from 'src/app/shared/models/end-points';
import { ITask } from '../models/ITask';
import { IResponse } from '../models/IResponse';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private serviceUrl = `${environment.DOMAIN}/${EndPoints.TASK_SERVICE}`;

    constructor(private http: HttpClient) { }

    getTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<any>(url);
    }

    getTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get<any>(url);
    }

    saveTask(task: ITask) {
        const url = `${this.serviceUrl}`;
        return this.http.post(url, task);
    }

    updateTask(id: Guid, task: ITask) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.put(url, task);
    }

    deleteTask(id: Guid) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete(url);
    }
}

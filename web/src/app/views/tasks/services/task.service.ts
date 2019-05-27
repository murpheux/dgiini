import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EndPoints } from 'src/app/shared/models/end-points';
import { ITask } from '../models/ITask';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private serviceUrl = `${environment.DOMAIN}/${EndPoints.TASK_SERVICE}`;

    constructor(private http: HttpClient) { }

    getTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;

        return this.http.get<any>(url).pipe(
            catchError(this.handleError)
        );
    }

    getTask(id: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;

        return this.http.get<any>(url);
    }

    saveTask(task: IResponse) {
        const url = `${this.serviceUrl}`;
        return this.http.post(url, task);
    }

    updateTask(id: string, task: ITask) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.put(url, task);
    }

    deleteTask(id: string) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete(url);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
    }
}

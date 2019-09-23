import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ITask } from '../models/ITask';
import { IResponse } from '../models/IResponse';
import { Guid } from 'guid-typescript';
import { LocationService } from '../../user/services/location.service';
import { ITaskBid } from '../models/ITaskBid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private serviceUrl = `${environment.APIGW_API}/task/v1/tasks`;
    private bidServiceUrl = `${environment.APIGW_API}/task/v1/bids`;

    constructor(
        private http: HttpClient,
        private locationService: LocationService
    ) { }

    getTaskCategories(): Observable<IResponse> {
        const url = `${environment.APIGW_API}/task/v1/categories`;
        return this.http.get<IResponse>(url);
    }

    getTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getFeaturedTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getRecentTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getUserTasks(user: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/user/${user}`;
        return this.http.get<IResponse>(url);
    }

    getTasksByCategories(category: string[]): Observable<IResponse> {
        const url = `${this.serviceUrl}/category/${encodeURIComponent(JSON.stringify(category))}`;
        return this.http.get<IResponse>(url);
    }

    getTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get<IResponse>(url);
    }

    saveTask(task: ITask) {
        const url = `${this.serviceUrl}`;
        return this.http.post(url, task);
    }

    saveBid(bid: ITaskBid): Observable<IResponse> {
        const url = `${this.bidServiceUrl}`;
        return this.http.post<IResponse>(url, bid);
    }

    searchTask(searchstr: string) {
        const url = `${this.serviceUrl}/search/${searchstr}`;
        return this.http.get<IResponse>(url);
    }

    searchUserTask(searchstr: string, user: Guid) {
        const url = `${this.serviceUrl}/${user}/search/${searchstr}`;
        return this.http.get<IResponse>(url);
    }

    acceptBid(id: Guid): Observable<IResponse> {
        const url = `${this.bidServiceUrl}`;
        return this.http.put<IResponse>(url, { _id: id, acceptted: true });
    }

    cancelTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.put<IResponse>(url, { _id: id, cancelled: true });
    }

    updateTask(id: Guid, task: ITask) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.put(url, task);
    }

    deleteTask(id: Guid) {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete(url);
    }

    enrichTasks(tasks: ITask[]) {
        if (!tasks) { return; }

        const userList = tasks.map(m => m.client.id)
            .filter((value, index, self) => self.indexOf(value) === index);

        // this.locationService.getUserList(userList).subscribe(res => {
        //     tasks.forEach(m => {
        //         res.payload.filter(user => {
        //             m.client = m.client.id === user._id ? user : m.client;
        //         });
        //     });
        // });
    }
}

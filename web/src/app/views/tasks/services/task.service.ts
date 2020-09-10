import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { IResponse } from '../../../shared/models/response';
import { UserService } from '../../user/services/user.service';
import { IBid } from '../models/bid';
import { ITask, TaskStatus } from '../models/task';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private serviceUrl = undefined;
    private bidServiceUrl = undefined;

    constructor(
        private env: EnvService,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.serviceUrl = `${env.apiUrl}/task/v1/tasks`;
        this.bidServiceUrl = `${env.apiUrl}/task/v1/bids`;
    }

    getTaskBids(taskid: Guid): Observable<IResponse> {
        const url = `${this.bidServiceUrl}/task/${taskid}`;
        return this.http.get<IResponse>(url);
    }

    getTaskCategories(): Observable<IResponse> {
        const url = `${this.env.apiUrl}/task/v1/categories`;
        return this.http.get<IResponse>(url);
    }

    getTaskStatistics(): Observable<IResponse> {
        const url = `${this.serviceUrl}/stats/full`;
        return this.http.get<IResponse>(url);
    }

    getTasks(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getTasksByCity(city: string): Observable<IResponse> {
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
        const url = `${this.serviceUrl}/category/${encodeURIComponent(
            JSON.stringify(category)
        )}`;
        return this.http.get<IResponse>(url);
    }

    getCategoryStats(): Observable<IResponse> {
        const url = `${this.serviceUrl}/category/stats`;
        return this.http.get<IResponse>(url);
    }

    getCategoryStatsByCity(city: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/category/stats/${city}`;
        return this.http.get<IResponse>(url);
    }

    getUserStatusStats(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/status/stats/${id}`;
        return this.http.get<IResponse>(url);
    }

    getTasksByCategoriesAndCity(
        category: string[],
        city: string
    ): Observable<IResponse> {
        const url = `${
            this.serviceUrl
        }/city/${city}/category/${encodeURIComponent(
            JSON.stringify(category)
        )}`;
        return this.http.get<IResponse>(url);
    }

    getTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get<IResponse>(url);
    }

    getTaskPhotos(taskids: Guid[]): Observable<IResponse> {
        const url = `${this.serviceUrl}/photos?filter={"_id":[${taskids.map(
            (u) => '"' + u + '"'
        )}]}`;

        return this.http.get<IResponse>(url);
    }

    saveTask(task: ITask): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, task);
    }

    saveBid(bid: IBid): Observable<IResponse> {
        const url = `${this.bidServiceUrl}`;
        return this.http.post<IResponse>(url, bid);
    }

    searchTask(searchstr: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/search/${searchstr}`;
        return this.http.get<IResponse>(url);
    }

    searchUserTask(searchstr: string, user: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${user}/search/${searchstr}`;
        return this.http.get<IResponse>(url);
    }

    acceptBid(id: Guid): Observable<IResponse> {
        const url = `${this.bidServiceUrl}`;
        return this.http.put<IResponse>(url, { _id: id, accepted: true });
    }

    cancelTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.put<IResponse>(url, { id, status: TaskStatus.cancelled });
    }

    updateTask(id: Guid, task: ITask): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.put<IResponse>(url, task);
    }

    deleteTask(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete<IResponse>(url);
    }

    enrichBids(bids: IBid[]): void {
        if (!bids) {
            return;
        }

        const userList = bids
            .map((m) => m.user)
            .filter((value, index, self) => self.indexOf(value) === index);

        this.userService.getUserList2(userList).subscribe(res => {
            bids.forEach(m => {
                res.payload.data.filter(user => {
                    m.userAccount = m.user === user._id ? user : m.user;
                });
            });
        });
    }

    enrichTasksWithPhotos(tasks: ITask[]): void {
        if (!tasks) {
            return;
        }

        const taskList = tasks
            .map((m) => m._id)
            .filter((value, index, self) => self.indexOf(value) === index);

        this.getTaskPhotos(taskList).subscribe(res => {
            tasks.forEach(t => {
                res.payload.data.filter(task => {
                    t.photos = t._id === task._id ? task.photos : t.photos;
                });
            });
        });
    }

    enrichTasks(tasks: ITask[]): void {
        if (!tasks) {
            return;
        }

        const userList = tasks
            .map((m) => m.client)
            .filter((value, index, self) => self.indexOf(value) === index);

        this.userService.getUserList(userList).subscribe(res => {
            tasks.forEach(m => {
                res.payload.data.filter(user => {
                    m.clientUser = m.client === user._id ? user : m.client;
                });
            });
        });
    }

    getStatusColor(status: string): string {
        let stats = 'danger';

        switch (status) {
            case TaskStatus.completed:
                stats = 'success';
                break;

            case TaskStatus.open:
                stats = 'warning';
                break;

            default:
                stats = 'danger';
                break;
        }

        return stats;
    }
}

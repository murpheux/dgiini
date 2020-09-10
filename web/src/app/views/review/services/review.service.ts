import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { IResponse } from '../../../shared/models/response';
import { UserService } from '../../user/services/user.service';
import { IReview } from '../models/review';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private serviceUrl = undefined;

    constructor(
        private env: EnvService,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.serviceUrl = `${env.apiUrl}/review/v1/reviews`;
    }

    getReviews(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    getUserReviews(id: Guid): Observable<IResponse> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get<IResponse>(url);
    }

    saveReview(review: IReview): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, review);
    }

    enrichReviews(reviews: IReview[]): void {
        if (!reviews) {
            return;
        }

        const userList = reviews
            .map((m) => m.from)
            .filter((value, index, self) => self.indexOf(value) === index);

        this.userService.getUserList(userList).subscribe(res => {
            reviews.forEach(m => {
                res.payload.data.filter(user => {
                    m.fromUser = m.from === user._id ? user : undefined;
                    m.toUser = m.to === user._id ? user : undefined;
                });
            });
        });
    }
}

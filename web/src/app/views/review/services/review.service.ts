import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/shared/services/env.service';
import { Observable } from 'rxjs';
import { IReview } from '../models/review';
import { IResponse } from '../../tasks/models/IResponse';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private serviceUrl = undefined;

    constructor(
        private env: EnvService,
        private http: HttpClient,
    ) {
        this.serviceUrl = `${env.apiUrl}/review/v1/reviews`;
    }

    getUserReviews(): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.get<IResponse>(url);
    }

    saveReview(review: IReview): Observable<IResponse> {
        const url = `${this.serviceUrl}`;
        return this.http.post<IResponse>(url, review);
    }
}

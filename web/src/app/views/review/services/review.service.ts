import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/shared/services/env.service';

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
}

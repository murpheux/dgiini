import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../models/constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    // tslint:disable-next-line: no-any
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.authService.userClaims$.subscribe(claim => {
            if (claim) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${
                            claim.__raw
                        }`,
                    },
                });
            }
        });

        return next.handle(request);
    }
}

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../models/constants';
import * as HttpStatus from 'http-status-codes';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(
        private notifier: NotificationService,
        private authService: AuthService
    ) {}
    // tslint:disable-next-line: no-any
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

                    // server-side error
                    switch (error.status) {
                        case HttpStatus.UNAUTHORIZED:
                            this.authService.userClaims$.subscribe(claim => {
                                if (claim) {

                                    request = request.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${claim.__raw}`,
                                        },
                                    });
                                }
                            });
                            break;

                        case HttpStatus.BAD_REQUEST:
                            this.notifier.showWarning(
                                `Validation error - ${JSON.stringify(
                                    error.error.errors
                                )}`
                            );
                            break;

                        default:
                            this.notifier.showError(error.message);
                            break;
                    }
                }

                return throwError(error);
            })
        );
    }
}

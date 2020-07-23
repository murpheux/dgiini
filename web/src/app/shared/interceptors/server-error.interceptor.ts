import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../models/constants';
import * as HttpStatus from 'http-status-codes';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private notifier: NotificationService) {

    }
    // tslint:disable-next-line: no-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
                            const authUserProfile = localStorage.getItem(Constants.AUTH_USER_PROFILE);
                            if (authUserProfile) {
                                const currentUser = JSON.parse(authUserProfile);
                                request = request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${currentUser.accessToken}`
                                    }
                                });
                            }
                            break;

                        case HttpStatus.BAD_REQUEST:
                            this.notifier.showWarning(`Validation error - ${JSON.stringify(error.error.errors)}`);
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

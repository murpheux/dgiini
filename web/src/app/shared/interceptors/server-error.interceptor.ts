import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../models/constants';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private notifier: NotificationService) {

    }
    // tslint:disable-next-line: no-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    const authUserProfile = localStorage.getItem(Constants.AUTH_USER_PROFILE);
                    if (authUserProfile) {
                        const currentUser = JSON.parse(authUserProfile);
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${currentUser.accessToken}`
                            }
                        });
                    }
                } else {
                    this.notifier.showError(error.message);
                    return throwError(error);
                }
            })
        );
    }
}

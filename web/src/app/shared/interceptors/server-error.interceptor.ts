import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

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
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (currentUser) {
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

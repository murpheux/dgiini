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
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const currentBPMSUser = JSON.parse(localStorage.getItem('currentBPMSUser'));
        if (currentBPMSUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentBPMSUser.accessToken}`
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

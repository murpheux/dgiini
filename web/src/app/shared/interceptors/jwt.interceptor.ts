import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../models/constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // tslint:disable-next-line: no-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authUserClaim = localStorage.getItem(Constants.AUTH_USER_CLAIM);

        if (authUserClaim) {
            const currentToken = JSON.parse(authUserClaim);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${JSON.parse(currentToken.value).__raw}`
                }
            });
        }
        return next.handle(request);
    }
}

import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    // tslint:disable-next-line: no-any
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoadingService) {}

    // tslint:disable-next-line: no-any
    removeRequest(req: HttpRequest<any>): void {
        const i = this.requests.indexOf(req);
        this.requests.splice(i, 1);
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    // tslint:disable-next-line: no-any
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return new Observable((observer) => {
            const subscription = next.handle(req).subscribe(
                (event) => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                (err) => {
                    this.removeRequest(req);
                    observer.error(err);
                },
                () => {
                    this.removeRequest(req);
                    observer.complete();
                }
            );
            // teardown logic in case of cancelled requests
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}

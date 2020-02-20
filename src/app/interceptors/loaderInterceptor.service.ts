import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    error => { this.removeRequest(req); observer.error(error); },
                    () => { this.removeRequest(req); observer.complete(); });
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
}
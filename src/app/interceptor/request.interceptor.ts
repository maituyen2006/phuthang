import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../service/spinner.service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private router: Router, private loaderService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let reqHeaders: HttpHeaders = req.headers;
    if (!req.url.toLowerCase().endsWith('/auth') && !req.url.toLowerCase().startsWith('./assets')) {
      const session = JSON.parse(localStorage.CURRENT_ADMIN);
      if (!reqHeaders) {
        reqHeaders = new HttpHeaders();
      }
      reqHeaders = reqHeaders.set('Authorization', session.token);
    }
    const changedReq = req.clone({ headers: reqHeaders });
    this.requests.push(changedReq);
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(changedReq)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(changedReq);
              if (event.body && event.body.code === -9999) {
                localStorage.removeItem('CURRENT_ADMIN');
                this.router.navigate(['/auth']);
                subscription.unsubscribe();
              } else {
                observer.next(event);
              }
            }
          },
          err => {
            this.removeRequest(changedReq); observer.error(err);
          }, () => {
            this.removeRequest(changedReq); observer.complete();
          });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(changedReq);
        subscription.unsubscribe();
      };
    });
  }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
}

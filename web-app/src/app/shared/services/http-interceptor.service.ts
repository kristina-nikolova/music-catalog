import { Injectable, Injector, isDevMode } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private _injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('access_token');

    let authReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

    if (authToken) {
      authReq = authReq.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
    }

    return next.handle(authReq).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (isDevMode() && errorResponse.error) {
          console.warn(errorResponse.error.error.message);
        }

        const router = this._injector.get(Router);

        if (errorResponse.status === 401) {
          router.navigate(['/login']);
          if (authToken) {
            sessionStorage.removeItem('access_token');
          }
        }
        return _throw(errorResponse);
      })
    );
  }
}

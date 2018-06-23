import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';
import { AuthClientService } from '.';

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

        const _authService = this._injector.get(AuthClientService);
        console.log(errorResponse.status);
        if (errorResponse.status === 401) {
          _authService.logout();
        }
        return _throw(errorResponse);
      })
    );
  }
}

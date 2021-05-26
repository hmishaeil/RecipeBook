import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url === "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAw_1-_H9hHzqQMPWOJQqr4auJJPEvb88"){
      return next.handle(request);
    }

    return this.authService.user$.pipe(take(1), exhaustMap(user => {
      // const params = new HttpParams().set('auth', user.token);

      const modifiedRequest = request.clone({
        setParams: {
          auth: user.token
      }
      });
      return next.handle(modifiedRequest);
    }))
  }
}

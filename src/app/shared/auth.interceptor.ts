import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth: AuthService;

  private router: Router;

  constructor(auth: AuthService, router: Router) {
    this.router = router;
    this.auth = auth;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.auth.logout();
          void this.router.navigate(['/admin', 'login']);
        }
        return throwError(error);
      })
    );
  }
}

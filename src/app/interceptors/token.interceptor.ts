import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, take, tap, catchError, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;
  tenant: string;

  constructor(private authSrv: AuthService) {
    this.token = environment.adminToken;
    this.tenant = environment.adminTenant;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({headers: request.headers.set('Authorization',`Bearer ${this.token}`).set('X-TENANT-ID', this.tenant)});
    return next.handle(newReq).pipe(
      tap(event => {
        let ok = event instanceof HttpResponse ? 'andata' : '';
      },
      error => {}),
      catchError((error: HttpErrorResponse) => {return throwError(error)}),
      finalize(() => {})
      )
    }
}


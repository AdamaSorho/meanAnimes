import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authentificationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = `${environment.TOKEN_TYPE} ${this._authentificationService.token}`;
    
    if(token) {
      return next.handle(request.clone({setHeaders: {Authorization: token}}));
    }

    return next.handle(request);
  }
}

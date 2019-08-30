import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ErrHanlderService } from './err-hanlder.service';
import { ResponseHandlerService } from './response-handler.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    public _errHandler: ErrHanlderService,
    private _reqHandler: ResponseHandlerService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        this._reqHandler.handleReq(event, elapsed)        
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this._errHandler.handleErr(err);
      }
    });
  }

}

import { Injectable } from '@angular/core';
import {
 HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  private API_KEY = '9f4d5d1b-2ecc-4d62-972b-d5bc07df5d92';

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('https://api.globalgiving.org/api/public')) {
      const paramReq = request.clone({
        params: request.params.set('api_key', this.API_KEY)
      });
      return next.handle(paramReq);
    }
    return next.handle(request);
  }
}

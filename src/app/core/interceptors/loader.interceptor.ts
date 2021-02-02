import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { PreloaderService } from '../service/preloader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public preloader: PreloaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.preloader.show();
    return next.handle(request).pipe(
      finalize(() => this.preloader.hide())
    );
  }
}

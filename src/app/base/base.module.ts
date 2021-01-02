import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GlobalGivingApiService } from '../core/service/global-giving-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ParamsInterceptor } from '../core/interceptors/params.interceptor';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [MainPageComponent],
  providers: [
    GlobalGivingApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamsInterceptor,
      multi: true
    }
  ]
})
export class BaseModule {}

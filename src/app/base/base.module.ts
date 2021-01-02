import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GlobalGivingApiService } from '../core/service/global-giving-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ParamsInterceptor } from '../core/interceptors/params.interceptor';
import { BallSpinsComponent } from './components/ball-spins/ball-spins.component';

@NgModule({
  declarations: [MainPageComponent, BallSpinsComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [MainPageComponent, BallSpinsComponent],
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

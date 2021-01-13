import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { GlobalGivingApiService } from '../core/service/global-giving-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ParamsInterceptor } from '../core/interceptors/params.interceptor';
import { ProjectListComponent } from './components/project-list/project-list.component';

@NgModule({
  declarations: [MainPageComponent, ProjectListComponent],
  imports: [CommonModule, SharedModule, HttpClientModule],
  exports: [MainPageComponent, ProjectListComponent],
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

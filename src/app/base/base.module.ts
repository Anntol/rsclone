import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base-routing.module';
import { GlobalGivingApiService } from '../core/service/global-giving-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ParamsInterceptor } from '../core/interceptors/params.interceptor';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SortProjectsPipe } from './pipes/sort-projects.pipe';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PhoneValidationComponent } from './components/phone-validation/phone-validation.component';
import { SetModeComponent } from './components/set-mode/set-mode.component';
import { AuthNoticeComponent } from './components/auth-notice/auth-notice.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ProjectListComponent,
    ProjectCardComponent,
    VerticalMenuComponent,
    ProjectsPageComponent,
    ThemesListComponent,
    AuthPageComponent,
    SortProjectsPipe,
    UserProfileComponent,
    PhoneValidationComponent,
    SetModeComponent,
    AuthNoticeComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    MainPageComponent,
    ProjectListComponent,
    ProjectCardComponent,
    VerticalMenuComponent,
    ProjectsPageComponent,
    UserProfileComponent,
    PhoneValidationComponent,
    SetModeComponent,
    AuthNoticeComponent
  ],
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

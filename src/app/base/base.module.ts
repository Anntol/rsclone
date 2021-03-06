import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base-routing.module';
import { GlobalGivingApiService } from '../core/service/global-giving-api.service';
import { PreloaderService } from '../core/service/preloader.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ParamsInterceptor } from '../core/interceptors/params.interceptor';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SortProjectsPipe } from './pipes/sort-projects.pipe';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoaderInterceptor } from '../core/interceptors/loader.interceptor';
import { GitMenuComponent } from './components/git-menu/git-menu.component';

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
    PreloaderComponent,
    ContentPageComponent,
    NotFoundPageComponent,
    GitMenuComponent
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
    NotFoundPageComponent,
    GitMenuComponent
  ],
  providers: [
    GlobalGivingApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamsInterceptor,
      multi: true
    },
    PreloaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ]
})
export class BaseModule {}

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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SetModeComponent } from './components/set-mode/set-mode.component';
import { AuthNoticeComponent } from './components/auth-notice/auth-notice.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoaderInterceptor } from '../core/interceptors/loader.interceptor';
import { GitMenuComponent } from './components/git-menu/git-menu.component';
import { FavouritesListComponent } from './components/favourites-list/favourites-list.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';

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
    SetModeComponent,
    AuthNoticeComponent,
    PreloaderComponent,
    UserInfoComponent,
    ContentPageComponent,
    NotFoundPageComponent,
    GitMenuComponent,
    FavouritesListComponent,
    DeleteItemComponent
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
    SetModeComponent,
    AuthNoticeComponent,
    NotFoundPageComponent,
    GitMenuComponent,
    FavouritesListComponent,
    DeleteItemComponent
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppInitService } from './core/service/app-init.service';
import { BaseModule } from './base/base.module';
import { SettingsModule } from './settings/settings.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorComponent } from './shared/components/error/error.component';
import { WarningComponent } from './shared/components/warning/warning.component';
import { MapModule } from './map/map.module';

// this function for load any static json file from ./assets/i18n
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<unknown> => appInitService.Init()
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BaseModule,
    SettingsModule,
    MapModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, WarningComponent]
})
export class AppModule {}

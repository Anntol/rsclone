import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { QuickSettingsComponent } from './components/quick-settings/quick-settings.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { GitMenuComponent } from './components/git-menu/git-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobeComponent } from './components/globe/globe.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavMenuComponent,
    VerticalMenuComponent,
    QuickSettingsComponent,
    NotFoundPageComponent,
    GitMenuComponent,
    FooterComponent,
    GlobeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {}

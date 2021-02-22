import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './base/pages/main-page/main-page.component';
// import { GlobeComponent } from './core/components/globe/globe.component';
import { VerticalMenuComponent } from './core/components/vertical-menu/vertical-menu.component';
import { QuickSettingsComponent } from './core/components/quick-settings/quick-settings.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainPageComponent
  },
  {
    path: 'projects',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  {
    path: 'map',
    loadChildren: () => import('src/app/map/map.module').then((m) => m.MapModule)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('src/app/settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: '',
    component: VerticalMenuComponent,
    outlet: 'nav-vertical'
  },
  {
    path: '',
    component: QuickSettingsComponent,
    outlet: 'quick-settings'
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent } // TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

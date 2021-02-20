import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './base/pages/main-page/main-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  {
    path: 'projects',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  {
    path: 'page-map',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  {
    path: 'page-login',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  {
    path: 'page-settings',
    loadChildren: () => import('src/app/settings/settings.module').then((m) => m.SettingsModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent } // TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

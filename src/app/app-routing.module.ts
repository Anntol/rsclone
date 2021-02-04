import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './base/pages/main-page/main-page.component';
// import { NotFoundPageComponent } from './base/components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  {
    path: '',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: NotFoundPageComponent } // TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './base/pages/auth-page/auth-page.component';
import { MainPageComponent } from './base/pages/main-page/main-page.component';

const routes: Routes = [
  { path: 'login', component: AuthPageComponent },
  { path: 'signup', component: AuthPageComponent },
  { path: 'home', component: MainPageComponent },
  {
    path: 'projects',
    loadChildren: () => import('src/app/base/base.module').then((m) => m.BaseModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },  // TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

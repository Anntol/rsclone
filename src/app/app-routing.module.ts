import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './base/pages/main-page/main-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: MainPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },  // TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

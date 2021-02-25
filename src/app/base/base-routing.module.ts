import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { UserProfileComponent } from '../settings/pages/user-profile/user-profile.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPageComponent,
    children: [
      {
        path: 'signup',
        component: AuthPageComponent,
      },
      {
        path: 'login',
        component: AuthPageComponent,
      },
      {
        path: 'settings',
        component: UserProfileComponent,
      },
      {
        path: 'projects',
        component: ThemesListComponent,
      },
      {
        path: 'projects/:theme',
        component: ProjectListComponent,
      },
      {
        path: 'projects/:theme/:id',
        component: ProjectCardComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }

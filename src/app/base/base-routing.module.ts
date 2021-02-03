import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPageComponent,
    children: [
      {
        path: '',
        component: ContentPageComponent,
      },
      {
        path: ':theme',
        component: ProjectListComponent,
      },
      {
        path: ':theme/:id',
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

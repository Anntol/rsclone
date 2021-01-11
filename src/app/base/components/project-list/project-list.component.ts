import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IProject, IProjects } from 'src/app/core/models/projects.model';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  country = 'UA';

  @Input() dataProjects!: IProject[];

  hasNext = false;

  nextProjectId = 1;

  nextProjectMessage = '';

  constructor(private globalGivingApiService: GlobalGivingApiService) {}

  ngOnInit(): void {
    this.globalGivingApiService
      .getActiveProjectsForCountry(this.country)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IProjects) => {
        if (data.projects.hasNext !== undefined) {
          this.nextProjectId = data.projects.nextProjectId;
        }
        this.hasNext = data.projects.hasNext || false;
        this.dataProjects = data.projects.project;
      });
  }

  public nextPage(): void {
    if (this.hasNext) {
      this.globalGivingApiService
        .getActiveProjectsForCountry(this.country, this.nextProjectId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: IProjects) => {
          if (data.projects.hasNext !== undefined) {
            this.nextProjectId = data.projects.nextProjectId;
          }
          this.hasNext = data.projects.hasNext || false;
          this.nextProjectMessage = !this.hasNext ? 'There are no more active projects!!' : '';
          this.dataProjects = this.dataProjects.concat(data.projects.project);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

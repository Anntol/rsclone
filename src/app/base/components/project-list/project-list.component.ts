import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/core/models/projects.model';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  country = 'UA';

  @Input() dataProjects!: IProject[];

  hasNext = false;

  nextProjectId = 1;

  nextProjectMessage = '';

  constructor(private globalGivingApiService: GlobalGivingApiService) { }

  ngOnInit(): void {
    this.globalGivingApiService.getActiveProjectsForCountry(this.country).subscribe((data) => {
      if (data.projects.hasNext !== undefined) {
        this.nextProjectId = data.projects.nextProjectId;
      }
      this.hasNext = data.projects.hasNext || false;
      this.dataProjects = data.projects.project;
    });
  }

  public nextPage(): void {
    if (this.hasNext) {
      this.globalGivingApiService.getActiveProjectsForCountry(this.country, this.nextProjectId).subscribe((data) => {
        if (data.projects.hasNext !== undefined) {
          this.nextProjectId = data.projects.nextProjectId;
        }
        this.hasNext = data.projects.hasNext || false;
        this.nextProjectMessage = !this.hasNext ? 'There are no more active projects!!' : '';
        this.dataProjects = this.dataProjects.concat(data.projects.project);
      });
    }
  }
}

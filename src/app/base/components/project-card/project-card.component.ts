import { Component, Input } from '@angular/core';
import { IProject } from '../../../core/models/projects.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() public dataProjects!: IProject[];
}

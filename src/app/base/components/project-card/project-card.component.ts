import {
 Component, OnDestroy, OnInit
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
 EMPTY, Subscription
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { WarningComponent } from '../../../shared/components/warning/warning.component';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { IProject, IProjectById } from '../../../core/models/projects.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  set subscription(sb: Subscription) { this.subscriptions.push(sb) };

  projectId!: number;

  public project!: IProject;

  fundingIndicator = '';

  error = false;

  errorMessage = '';

  constructor (
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private globalGivingApiService: GlobalGivingApiService
    ) {

  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.projectId = params.id;
    });

    this.getProjectById(this.projectId);
  }

  public getProjectById(id: number): void {
    this.subscription = this.globalGivingApiService
    .getActiveProjectById(id)
    .pipe(
      catchError((error) => {
        this.error = true;
        return EMPTY;
      })
    ).subscribe((result: IProjectById): void => {
      if (result) {
        this.project = result.project;
        this.fundingIndicator = (Math.floor(100 * (result.project.funding / result.project.goal)) > 100) ? '100%'
          : `${Math.floor(100 * (result.project.funding / result.project.goal))}%`;
        const { donationOptions } = result.project;
         console.log(this.project, donationOptions);
        this.error = false;
        this.errorMessage = '';
      } else {
        const warningMessage = 'No projects found! Please try again.';
        this.dialog.open(WarningComponent, { data: { message: warningMessage } });
      }
    });
}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

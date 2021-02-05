import {
 Component, OnDestroy, OnInit
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
 EMPTY, Subscription
} from 'rxjs';

import { DataService } from 'src/app/core/service/data.service';
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
    private dataService: DataService,
    private globalGivingApiService: GlobalGivingApiService
    ) {

  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.projectId = params.id;
    });
}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

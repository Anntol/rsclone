import {
 Component, OnInit, OnDestroy
} from '@angular/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, Subscription } from 'rxjs';

import {
 IProject, IQueryOptions, ISearchResults
} from 'src/app/core/models/projects.model';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss', '../../../../theme/stacks.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private subscriptions: Subscription[] = [];

  set subscription(sb: Subscription) { this.subscriptions.push(sb) };

  queryOptions: IQueryOptions = {
    keyWords: '*',
    startNumber: 0,
    iso3166CountryCode: '',
    theme: ''
  };

  countProjects = 0;

  // searchQuery: FormControl = new FormControl();

  error = false;

  hasNext = false;

  errorMessage = '';

  dataProjects!: IProject[];

  // country = 'UA';

  constructor(
    private globalGivingApiService: GlobalGivingApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      this.queryOptions.theme = params.id as string;
      console.log(this.queryOptions);
    });

    this.globalGivingApiService.getActiveProjectsByKeyWords(this.queryOptions).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.dataProjects = [];
        this.error = true;
        return EMPTY;
      })
    ).subscribe((results: ISearchResults) => {
      if (results.search.response.numberFound > 0) {
        this.countProjects = results.search.response.numberFound;
        this.dataProjects = results.search.response.projects.project;
        this.error = false;
        this.errorMessage = '';
        console.log(this.countProjects, this.dataProjects);
      } else {
        this.errorMessage = 'No projects found! Please try again.';
      }
    });
  }

  public nextPage(): void {
    // if (this.hasNext) {
    //   this.globalGivingApiService
    //     .getActiveProjectsForCountry(this.country, this.nextProjectId)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((data: IProjects) => {
    //       if (data.projects.hasNext !== undefined) {
    //         this.nextProjectId = data.projects.nextProjectId;
    //       }
    //       this.hasNext = data.projects.hasNext || false;
    //       this.nextProjectMessage = !this.hasNext ? 'There are no more active projects!!' : '';
    //       this.dataProjects = this.dataProjects.concat(data.projects.project);
    //     });
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

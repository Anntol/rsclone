import {
 Component, OnInit, OnDestroy
} from '@angular/core';
import { catchError } from 'rxjs/operators';
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

  countShowProjects = 0;

  countAllProjects = 0;

  // searchQuery: FormControl = new FormControl();

  error = false;

  errorMessage = '';

  dataProjects!: IProject[];

  constructor(
    private globalGivingApiService: GlobalGivingApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      this.queryOptions.theme = params.id as string;
      console.log(this.queryOptions);
    });

    this.subscription = this.globalGivingApiService
    .getActiveProjectsByKeyWords(this.queryOptions)
    .pipe(
      catchError((error) => {
        this.dataProjects = [];
        this.error = true;
        return EMPTY;
      })
    ).subscribe((results: ISearchResults): void => {
      if (results.search.response.numberFound > 0) {
        this.countShowProjects = 0;
        this.countAllProjects = results.search.response.numberFound;
        this.dataProjects = results.search.response.projects.project;
        this.error = false;
        this.errorMessage = '';
        console.log(this.countAllProjects, results.search);
      } else {
        this.errorMessage = 'No projects found! Please try again.';
        console.log(this.errorMessage);
      }
    });
  }

  public nextPage(): void {
    if (this.countAllProjects > this.countShowProjects) {
      this.queryOptions.startNumber = this.countShowProjects;
      // console.log(this.queryOptions);
      this.subscription = this.globalGivingApiService
        .getActiveProjectsByKeyWords(this.queryOptions)
        .subscribe((results: ISearchResults): void => {
          this.countShowProjects = (this.countAllProjects - this.countShowProjects > 10)
            ? this.countShowProjects + 10
            : this.countAllProjects;
          this.countAllProjects = results.search.response.numberFound;
          this.dataProjects = this.dataProjects.concat(results.search.response.projects.project);
          console.log(this.countShowProjects, results.search);
        });
    } else {
      console.log('There are no more active projects!');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

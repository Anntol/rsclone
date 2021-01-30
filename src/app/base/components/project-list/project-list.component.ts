import {
 Component, Input, OnInit, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {
  filter, switchMap, debounceTime, catchError
 } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
 EMPTY, Observable, Subscription
} from 'rxjs';
import { FormControl } from '@angular/forms';
import {
 IProject, IQueryOptions, ISearchResults
} from 'src/app/core/models/projects.model';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { SettingsService } from '../../../core/service/settings.service';
import { MIN_LENGTH_QUERY, WAIT_FOR_INPUT } from '../../../shared/constants/constants';
import { IFavourite } from '../../../core/models/favourite.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss', '../../../../theme/stacks.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  set subscription(sb: Subscription) { this.subscriptions.push(sb) };

  @Input() searchQuery!: FormControl;

  queryOptions: IQueryOptions = {
    keyWords: '*',
    startNumber: 0,
    iso3166CountryCode: '',
    theme: ''
  };

  countShowProjects = 10;

  countAllProjects = 0;

  error = false;

  errorMessage = '';

  dataProjects!: IProject[];

  constructor(
    private globalGivingApiService: GlobalGivingApiService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      this.queryOptions.theme = params.id as string;
      console.log(this.queryOptions)
    });

    this.getProjectsByFilters(this.queryOptions);
  }

  ngOnChange(): void {
    this.getProjectsBySearchQuery(this.searchQuery);
    this.cdr.detectChanges();
  }

  public getProjectsByFilters(options: IQueryOptions): void {
    this.subscription = this.globalGivingApiService
    .getActiveProjectsByKeyWords(options)
    .pipe(
      catchError((error) => {
        this.dataProjects = [];
        this.error = true;
        return EMPTY;
      })
    ).subscribe((results: ISearchResults): void => {
      if (results.search.response.numberFound > 10) {
        this.countShowProjects = 10;
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

  public getProjectsBySearchQuery(searchQuery: FormControl): void {
    if (searchQuery) {
      this.subscription = searchQuery.valueChanges
      .pipe(
        filter((value: string) => value.length > MIN_LENGTH_QUERY),
        debounceTime(WAIT_FOR_INPUT),
        switchMap(
          (value: string): Observable<ISearchResults> => {
            this.queryOptions.keyWords = value;
            return this.globalGivingApiService.getActiveProjectsByKeyWords(this.queryOptions).pipe(
              catchError((error) => {
                this.dataProjects = [];
                this.error = true;
                return EMPTY;
              })
            );
          }
        )
      )
      .subscribe((results: ISearchResults) => {
        if (results.search.response.numberFound > 0) {
          this.dataProjects = results.search.response.projects.project;
          this.error = false;
          this.errorMessage = '';
          console.log(this.dataProjects);
        } else {
          this.errorMessage = 'No projects found! Please try again.';
        }
      });
    }
  }

  public nextPage(): void {
    if (this.countAllProjects > this.countShowProjects) {
      this.queryOptions.startNumber = this.countShowProjects;
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

  onChangeUserFavorites(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      const favourite: IFavourite = {
        projectId: +checkbox.id,
        title: checkbox.title
      }
      this.settingsService.addUserFavourite(favourite);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

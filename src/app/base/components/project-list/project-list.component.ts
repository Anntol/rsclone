import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { WarningComponent } from '../../../shared/components/warning/warning.component';
import {
 IProjectWithFavourite, IQueryOptions, ISearchResults
} from '../../../core/models/projects.model';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { DataService } from '../../../core/service/data.service';
import { PreloaderService } from '../../../core/service/preloader.service';
import { AuthService } from '../../../core/service/auth.service';
import { SettingsService } from '../../../core/service/settings.service';
import { IFavourite } from '../../../core/models/favourite.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: [
    './project-list.component.scss',
    '../../../../theme/stacks.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/noselect.scss'
  ]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  set subscription(sb: Subscription) { this.subscriptions.push(sb) };

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

  fundingIndicator = 1;

  dataProjects: IProjectWithFavourite[] = [];

  userFavourites: IFavourite[] = [];

  isUserAuthenticated = false;

  IsVisibleMore = true;

  public search!: string;

  public optionsSort: Sort = {
    active: '',
    direction: ''
  };

  constructor(
    private globalGivingApiService: GlobalGivingApiService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public preloader: PreloaderService,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params): void => {
      this.queryOptions.theme = params.theme as string;
    });

    this.subscription = this.dataService.isSort.subscribe((sort: Sort) => {
      this.optionsSort = sort;
    });

    this.subscription = this.dataService.isSearchQuery.subscribe((search): void => {
      this.queryOptions.keyWords = search;
      this.queryOptions.theme = '';
      this.dataProjects = [];
      this.getProjectsByFilters(this.queryOptions);
    });

    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.subscription = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });

    this.getUserFavourites();

    this.getProjectsByFilters(this.queryOptions);
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
      this.countAllProjects = results.search.response.numberFound;
      if (this.countAllProjects > 10) {
        this.countShowProjects = (this.countAllProjects - this.countShowProjects > 10)
            ? this.countShowProjects + 10
            : this.countAllProjects;
        this.IsVisibleMore = true;
        this.dataProjects = this.dataProjects.concat(results.search.response.projects.project).map((obj) => (
        {
          ...obj,
          isFavourite: this.userFavourites.findIndex((item) => item.projectId === obj.id) > -1,
          fundingIndicator: (Math.floor(100 * (obj.funding / obj.goal)) > 100) ? '100%'
          : `${Math.floor(100 * (obj.funding / obj.goal))}%`
        }));
        this.error = false;
        this.errorMessage = '';
        this.preloader.hide();
      } else {
        const warningMessage = 'No projects found! Please try again.';
        this.dialog.open(WarningComponent, { data: { message: warningMessage } });
        this.preloader.hide();
      }
    });
  }

  public nextPage(): void {
    if (this.countAllProjects > this.countShowProjects) {
      this.queryOptions.startNumber = this.countShowProjects;
      this.IsVisibleMore = false;
      this.getProjectsByFilters(this.queryOptions);
    } else {
      this.preloader.hide();
      const warningMessage = 'There are no more active projects!';
      this.dialog.open(WarningComponent, { data: { message: warningMessage } });
    }
  }

  public goToDonatePage(project: IProjectWithFavourite): void {
    this.dataService.setProjectById(project);
    const path = `projects/${this.queryOptions.theme || ''}`;
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate([path, project.id]);
  }

  public onChangeUserFavorites(e: Event): void {
    if (this.isUserAuthenticated) {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
        const favourite: IFavourite = {
          projectId: +checkbox.id,
          title: checkbox.title
        }
        this.settingsService.addUserFavourite(favourite);
      } else {
        this.settingsService.removeUserFavourite(checkbox.id);
      }
    }
  }

  getUserFavourites(): void {
    if (this.isUserAuthenticated) {
      const favsObservable = this.settingsService.getUserFavourites();
      favsObservable.subscribe((data) => {
        this.userFavourites = data.favourites;
        this.dataProjects?.forEach((obj) => {
          const project = obj;
          project.isFavourite = this.userFavourites.findIndex((item) => item.projectId === obj.id) > -1;
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}

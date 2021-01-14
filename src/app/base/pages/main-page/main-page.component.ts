import {
 Component, OnInit, AfterViewChecked, OnDestroy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import {
 filter, switchMap, debounceTime, catchError, takeUntil
} from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';

import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { IUserToken } from '../../../core/models/users.models';
import { IProject, IQueryOptions, ISearchResults } from '../../../core/models/projects.model';
import { MIN_LENGTH_QUERY, WAIT_FOR_INPUT } from '../../../shared/constants/constants';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewChecked, OnDestroy {
  token!: IUserToken;

  destroy$: Subject<boolean> = new Subject<boolean>();

  queryOptions: IQueryOptions = {
    keyWords: 'black cat',
    startNumber: 0,
    iso3166CountryCode: '',
    theme: 'climate'
  };

  countProjects = 0;

  searchQuery: FormControl = new FormControl();

  error = false;

  errorMessage = '';

  dataProjects: IProject[] = [];

  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

 constructor(
   private globalGivingApiService: GlobalGivingApiService,
   public translate: TranslateService,
   private cdr: ChangeDetectorRef
   ) {}

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.searchQuery.valueChanges
      .pipe(
        filter((value: string) => value.length > MIN_LENGTH_QUERY),
        debounceTime(WAIT_FOR_INPUT),
        switchMap(
          (value: string): Observable<ISearchResults> => {
            this.queryOptions.keyWords = value;
            return this.globalGivingApiService.getActiveProjectsByKeyWords(this.queryOptions).pipe(
              takeUntil(this.destroy$),
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
          // console.log(this.dataProjects);
        } else {
          this.errorMessage = 'No projects found! Please try again.';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

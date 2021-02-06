import {
 AfterViewChecked, Component, ViewChild, ChangeDetectorRef, OnInit
} from '@angular/core';
import {
  filter, switchMap, debounceTime
 } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';
import { DataService } from '../../../core/service/data.service';
import { MIN_LENGTH_QUERY, WAIT_FOR_INPUT, THEMES } from '../../../shared/constants/constants';
import { IProjectWithFavourite } from '../../../core/models/projects.model';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss', '../../../../theme/buttons.scss', '../../../../theme/stacks.scss']
})
export class ProjectsPageComponent implements AfterViewChecked, OnInit {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  public searchQuery: FormControl = new FormControl();

  private subscriptions: Subscription[] = [];

  set subscription(sb: Subscription) { this.subscriptions.push(sb) };

  public sort!: Sort;

  public search!: string;

  public isVisibleFilterButton = false;

  public isSort = false;

  public isSearch = false;

  error = false;

  errorMessage = '';

  fundingIndicator = 1;

  dataProjects!: IProjectWithFavourite[];

  public pathId!: string;

  constructor(
    public translate: TranslateService,
    public router: Router,
    public dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  public sortData(sort: Sort): void {
    this.dataService.setSortOptions(sort);
  }

  public searchQueryData(search: string): void {
    this.dataService.setSearchQuery(search);
  }

  public changeFilter(el: HTMLElement): void {
    if(el.getAttribute('data-filter') === 'search') {
      this.isSearch = !this.isSearch;
      if (this.isSearch === this.isSort && this.isSort) {
        this.isSort = !this.isSort;
      }
    } else {
      this.isSort = !this.isSort;
      if (this.isSearch === this.isSort && this.isSort) {
        this.isSearch = !this.isSearch;
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.pathId = e.url.slice(e.url.lastIndexOf('/') + 1);
        const isIncludesPathId: number = THEMES.filter((element) => element.id === this.pathId).length
        if (isIncludesPathId) {
          this.isVisibleFilterButton = true;
        } else {
          this.isVisibleFilterButton = false;
        }
      }
    });

    this.searchQuery.valueChanges
    .pipe(
      filter((value: string) => value.length > MIN_LENGTH_QUERY),
      debounceTime(WAIT_FOR_INPUT),
      switchMap(
        (value: string): Observable<string> => of(value)
      )
    ).subscribe((value) => {
      this.searchQueryData(value);
    });
  }

  ngAfterViewChecked(): void {
    if (this.pathId !== 'settings') {
      this.translate.use(this.selectLang.myLanguage);
    }
    this.cdr.detectChanges();
  }
}

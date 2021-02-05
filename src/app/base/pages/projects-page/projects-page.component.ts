import {
 AfterViewChecked, Component, ViewChild, ChangeDetectorRef, OnInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';
import { DataService } from '../../../core/service/data.service';
import { THEMES } from '../../../shared/constants/constants';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss', '../../../../theme/buttons.scss', '../../../../theme/stacks.scss']
})
export class ProjectsPageComponent implements AfterViewChecked, OnInit {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  public searchQuery: FormControl = new FormControl();

  public sort!: Sort;

  public isVisibleFilterButton = false;

  public isSort = false;

  public isSearch = false;

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
  }

  ngAfterViewChecked(): void {
    if (this.pathId !== 'settings') {
      this.translate.use(this.selectLang.myLanguage);
    }
    this.cdr.detectChanges();
  }
}

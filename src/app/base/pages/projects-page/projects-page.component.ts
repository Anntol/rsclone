import {
 AfterViewChecked, Component, ViewChild, ChangeDetectorRef, OnInit
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';
import { DataService } from '../../../core/service/data.service';

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

  constructor(
    public translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    public dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  public sortData(sort: Sort): void {
    this.dataService.setSortOptions(sort);
  }

  public changeFilter(el: HTMLElement): void {
    if(el.getAttribute('data-filter') === 'search') {
      this.isSearch = !this.isSearch;
      if (this.isSearch === this.isSort) {
        this.isSort = !this.isSort;
      }
    } else {
      this.isSort = !this.isSort;
      if (this.isSearch === this.isSort) {
        this.isSearch = !this.isSearch;
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes('/projects')) {
          this.isVisibleFilterButton = true;
        } else {
          this.isVisibleFilterButton = false;
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

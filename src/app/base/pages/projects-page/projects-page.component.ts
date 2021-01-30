import {
 AfterViewChecked, Component, ViewChild, ChangeDetectorRef, OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
// import { IProject, IQueryOptions } from '../../../core/models/projects.model';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss', '../../../../theme/buttons.scss', '../../../../theme/stacks.scss']
})
export class ProjectsPageComponent implements AfterViewChecked {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  public searchQuery: FormControl = new FormControl();

  public sort!: Sort;

  constructor(
    public translate: TranslateService,
    public router: Router,
    public dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  public sortData(sort: Sort): void {
    this.dataService.setSortOptions(sort);
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

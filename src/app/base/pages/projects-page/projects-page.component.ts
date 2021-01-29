import {
 AfterViewChecked, Component, ViewChild, ChangeDetectorRef, OnInit
} from '@angular/core';
// import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
// import { IProject, IQueryOptions } from '../../../core/models/projects.model';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss', '../../../../theme/buttons.scss', '../../../../theme/stacks.scss']
})
export class ProjectsPageComponent implements AfterViewChecked, OnInit {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  searchQuery: FormControl = new FormControl();

  constructor(
    public translate: TranslateService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit(): void {
      console.log(this.searchQuery.value);
    }

   ngAfterViewChecked(): void {
     this.translate.use(this.selectLang.myLanguage);
     this.cdr.detectChanges();
   }
}

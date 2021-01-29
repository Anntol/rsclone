import {
 Component, AfterViewChecked, ViewChild, ChangeDetectorRef
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalGivingApiService } from '../../../core/service/global-giving-api.service';
import { IProject } from '../../../core/models/projects.model';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [
    './main-page.component.scss',
    '../../../../theme/globo.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/stacks.scss'
  ]
})
export class MainPageComponent implements AfterViewChecked {
  dataProjects: IProject[] = [];

  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

 constructor(
   private globalGivingApiService: GlobalGivingApiService,
   public translate: TranslateService,
   private cdr: ChangeDetectorRef,
   ) {}

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

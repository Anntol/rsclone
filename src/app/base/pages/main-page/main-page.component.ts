import {
 Component, AfterViewChecked, ViewChild, ChangeDetectorRef
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../../../core/models/users.models';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [
    './main-page.component.scss',
    './main-page-adaptive.scss',
    '../../../../theme/globo.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/stacks.scss',
    '../../../../theme/noselect.scss'
  ]
})
export class MainPageComponent implements AfterViewChecked {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  public userSetting!: IUser;

 constructor(
   public translate: TranslateService,
   private cdr: ChangeDetectorRef,
   ) {}

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

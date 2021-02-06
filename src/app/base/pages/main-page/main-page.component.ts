import {
 Component, AfterViewChecked, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { IUser } from '../../../core/models/users.models';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';
import { RECOMMENDED } from '../../../shared/constants/constants';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [
    './main-page.component.scss',
    './main-page-adaptive.scss',
    '../../../../theme/globo.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/stacks.scss'
  ]
})
export class MainPageComponent implements AfterViewChecked {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  public userSetting!: IUser;

 constructor(
   public translate: TranslateService,
   private router: Router,
   private cdr: ChangeDetectorRef,
   ) {}

getStarted(): void {
  const project = Math.floor(Math.random() * 5);
  const { id, theme } = RECOMMENDED[project];
  const path = `projects`;
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  this.router.navigate([path]);
 }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

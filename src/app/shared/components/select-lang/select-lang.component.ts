import { Component, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstants } from '../../constants/constants';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss', '../../../../theme/stacks.scss']
})
export class SelectLangComponent implements AfterViewChecked {
  public languageArr: Array<string> = CommonConstants.LANGUAGE_ARR;

  myLanguage = this.translate.currentLang || 'en';

  constructor(public translate: TranslateService) {}

  public ngAfterViewChecked(): void {
    localStorage.setItem('rs_userLang', JSON.stringify(this.myLanguage));
  }
}

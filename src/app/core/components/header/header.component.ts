import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstants } from '../../../shared/constants/constsnts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public languageArr: Array<string> = CommonConstants.LANGUAGE_ARR;

  constructor(public translate: TranslateService) {}

  public selectLanguage(val: string): void {
    this.translate.use(val.toLowerCase());
  }
}

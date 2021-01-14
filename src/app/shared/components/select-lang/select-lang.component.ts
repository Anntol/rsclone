import { Component } from '@angular/core';
import { CommonConstants } from '../../constants/constants';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent {
  public languageArr: Array<string> = CommonConstants.LANGUAGE_ARR;

  myLanguage = 'en';
}

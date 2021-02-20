import {
  Component,
  AfterViewChecked,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangComponent } from '../../../shared/components/select-lang/select-lang.component';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss', '../../../../theme/buttons.scss']
})
export class NotFoundPageComponent implements AfterViewChecked {
  @ViewChild(SelectLangComponent) selectLang!: SelectLangComponent;

  constructor(public translate: TranslateService, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.translate.use(this.selectLang.myLanguage);
    this.cdr.detectChanges();
  }
}

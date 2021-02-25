import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { THEMES } from '../../../shared/constants/constants';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: [
    './themes-list.component.scss',
    '../../../../theme/noselect.scss'
  ]
})

export class ThemesListComponent {
  themesList = THEMES;

  @Output()
  theme = new EventEmitter<string>();

  constructor(public router: Router) {}

  selectTheme(id: string): void {
    this.theme.emit(id);
  }

  public goToProjectsList(theme: string): void {
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate(['projects', theme]);
  }
}

import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { THEMES } from '../../../shared/constants/constants';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent {
  themesList = THEMES;

  @Output()
  theme = new EventEmitter<string>();

  selectTheme(id: string): void {
    this.theme.emit(id);
  }
}

import { Component } from '@angular/core';
import { ModeService } from '../../../core/service/mode.service';

@Component({
  selector: 'app-set-mode',
  templateUrl: './set-mode.component.html',
  styleUrls: ['./set-mode.component.scss']
})
export class SetModeComponent {
  public isDarkMode = false;

  constructor(private modeService: ModeService) {}

  public onChangeUserMode(e: Event): void {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      // this.isDarkMode = true;
      this.modeService.setDarkMode();
    } else {
      // this.isDarkMode = false;
      this.modeService.setLightMode();
    }
  }
}

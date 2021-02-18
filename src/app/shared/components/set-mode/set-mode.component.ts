import { Component, OnInit } from '@angular/core';
import { ModeService } from '../../../core/service/mode.service';

@Component({
  selector: 'app-set-mode',
  templateUrl: './set-mode.component.html',
  styleUrls: ['./set-mode.component.scss']
})
export class SetModeComponent implements OnInit {
  isLightMode = false;

  constructor(private modeService: ModeService) {}

  ngOnInit(): void {
    const { name } = this.modeService.getActiveMode();
    this.isLightMode = (name !== "light");
  }

  public onChangeUserMode(e: Event): void {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      this.modeService.setDarkMode();
    } else {
      this.modeService.setLightMode();
    }
  }
}

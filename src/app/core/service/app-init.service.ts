import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModeService } from './mode.service';
import { Mode, LIGHT } from "../../shared/constants/mode";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private modeService: ModeService, public translate: TranslateService) { }

  Init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data = localStorage.getItem('rs_userLang');
      if (data !== null) {
        const dataLang = JSON.parse(data) as string;
        this.translate.use(dataLang);
      } else {
        this.translate.use('en');
      }

      const dataMode = localStorage.getItem('rs_userMode');
      const active: Mode = dataMode !== null ? JSON.parse(dataMode) as Mode : LIGHT;

      if (active.name === 'light') {
        this.modeService.setLightMode();
      } else {
        this.modeService.setDarkMode();
        }
      resolve();
    });
  }
}

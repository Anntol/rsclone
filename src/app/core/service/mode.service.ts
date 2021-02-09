import { Injectable } from '@angular/core';
import { Mode, LIGHT, DARK } from "../../shared/constants/mode";

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private active: Mode = LIGHT;

  private availableMode: Mode[] = [LIGHT, DARK];

  getAvailableMode(): Mode[] {
    return this.availableMode;
  }

  getActiveMode(): Mode {
    return this.active;
  }

  setDarkMode(): void {
    this.setActiveMode(DARK);
  }

  setLightMode(): void {
    this.setActiveMode(LIGHT);
  }

  setActiveMode(mode: Mode): void {
    this.active = mode;
    console.log(this.active);

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.active.properties[property]
      );
    });
  }
}

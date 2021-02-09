import { Injectable } from '@angular/core';
import { Mode, LIGHT, DARK } from "../../shared/constants/mode";

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  // private active: Mode = JSON.parse(localStorage.getItem('rs_userMode')) || LIGHT;
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
    localStorage.setItem('rs_userMode', JSON.stringify(DARK));
  }

  setLightMode(): void {
    this.setActiveMode(LIGHT);
    localStorage.setItem('rs_userMode', JSON.stringify(LIGHT));
  }

  setActiveMode(mode: Mode): void {
    this.active = mode;

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.active.properties[property]
      );
    });
  }
}

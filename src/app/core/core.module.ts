import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [HeaderComponent, NavMenuComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, NavMenuComponent]
})
export class CoreModule {}

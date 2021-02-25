import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [HeaderComponent, NavMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [HeaderComponent, NavMenuComponent]
})
export class CoreModule {}

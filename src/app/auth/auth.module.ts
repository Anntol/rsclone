import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutnRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AutnRoutingModule
  ],
  exports: [AuthPageComponent]
})
export class AuthModule { }

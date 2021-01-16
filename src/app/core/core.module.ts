import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [LoginComponent, SignupComponent, HeaderComponent]
})
export class CoreModule {}

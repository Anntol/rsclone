import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { SelectCountryComponent } from './components/select-country/select-country.component';

@NgModule({
  declarations: [SelectLangComponent, SelectCountryComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    NgxMatIntlTelInputModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    SelectLangComponent,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    SelectCountryComponent,
    NgxMatIntlTelInputModule
  ],
})
export class SharedModule {}

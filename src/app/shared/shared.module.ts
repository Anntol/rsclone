import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
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
import { ShareButtonsPopupModule } from 'ngx-sharebuttons/popup';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ErrorComponent } from './components/error/error.component';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { WarningComponent } from './components/warning/warning.component';

@NgModule({
  declarations: [SelectLangComponent, SelectCountryComponent, ErrorComponent, WarningComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    NgxMatIntlTelInputModule,
    ShareButtonsPopupModule,
    ShareIconsModule,
    FontAwesomeModule,
    MatAutocompleteModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
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
    NgxMatIntlTelInputModule,
    ShareButtonsPopupModule,
    ShareIconsModule,
    FontAwesomeModule,
    MatAutocompleteModule
  ]
})
export class SharedModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faTimesCircle, faShare);
  }
}

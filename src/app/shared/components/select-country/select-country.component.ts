import { Component, OnInit } from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';

declare const require: (arg0: string) => { locale: string; countries: { [alpha2Key: string]: string | string[]; }; };

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  myLanguage = 'uk';

  countries = {};

  ngOnInit(): void {
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/uk.json"));
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/be.json"));

    switch (this.myLanguage) {
      case 'en':
        this.countries = i18nIsoCountries.getNames('en', { select: 'official' });
        break;
      case 'be':
        this.countries = i18nIsoCountries.getNames('be', { select: 'official' });
        break;
      case 'uk':
        this.countries = i18nIsoCountries.getNames('uk', { select: 'official' });
        break;
      default:
        console.log('Language is not defined');
    }
  }
}

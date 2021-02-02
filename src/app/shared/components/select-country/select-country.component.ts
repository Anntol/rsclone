import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ICountry } from '../../../core/models/projects.model';
import { Langs } from '../../../core/models/lang.model';
import { CountriesService } from '../../../core/service/countries.service';
// import { Component, OnInit } from '@angular/core';
// import * as i18nIsoCountries from 'i18n-iso-countries';

// declare const require: (arg0: string) => { locale: string; countries: { [alpha2Key: string]: string | string[]; }; };

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public countriesList!: ICountry[];

  constructor(
    private countries: CountriesService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe((value: Langs) => {
      this.countriesList = this.countries.getAllCountriesByLang(value);
    });

    this.countriesList = this.countries.getAllCountriesByLang(
      this.translate.currentLang as Langs
    );
    // console.log(this.translate.currentLang, this.countriesList);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
// export class SelectCountryComponent implements OnInit {
//   myLanguage = 'uk';

//   countries = {};

//   ngOnInit(): void {
//     i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
//     i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/uk.json"));
//     i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/be.json"));

//     switch (this.myLanguage) {
//       case 'en':
//         this.countries = i18nIsoCountries.getNames('en', { select: 'official' });
//         break;
//       case 'be':
//         this.countries = i18nIsoCountries.getNames('be', { select: 'official' });
//         break;
//       case 'uk':
//         this.countries = i18nIsoCountries.getNames('uk', { select: 'official' });
//         break;
//       default:
//         console.log('Language is not defined');
//     }
  }
}

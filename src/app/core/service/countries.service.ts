import { Injectable } from '@angular/core';
import { ICountry } from '../models/projects.model';
import { byCountries } from '../../../assets/country/by_country';
import { uaCountries } from '../../../assets/country/ua_country';
import { enCountries } from '../../../assets/country/en_country';
import { Langs } from '../models/lang.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private byCountries: ICountry[] = byCountries;

  private uaCountries: ICountry[] = uaCountries;

  private enCountries: ICountry[] = enCountries;

  getAllCountriesByLang(lang: Langs): ICountry[] {
    switch (lang) {
      case 'by':
        return this.byCountries;
      case 'en':
        return this.enCountries;
      case 'ua':
        return this.uaCountries;
      default:
        return this.byCountries;
    }
  }

  getLength(): number {
    return this.enCountries.length;
  }
}

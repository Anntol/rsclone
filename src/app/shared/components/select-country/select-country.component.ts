import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ICountry } from '../../../core/models/projects.model';
import { Langs } from '../../../core/models/lang.model';
import { CountriesService } from '../../../core/service/countries.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss','../../../../../node_modules/flag-icon-css/css/flag-icon.css']
})
export class SelectCountryComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public countriesList!: ICountry[];

  selectedCountry!: string;

  constructor(private countries: CountriesService, public translate: TranslateService) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe((value: Langs) => {
      this.countriesList = this.countries.getAllCountriesByLang(value);
    });

    this.countriesList = this.countries.getAllCountriesByLang(this.translate.currentLang as Langs);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

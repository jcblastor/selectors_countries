import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { combineLatest, Observable, of } from "rxjs";

import { CountrySmall, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.com/v3.1'

  get regiones(): string[] {
    return [ ...this._regiones ];
  }

  constructor(
    private readonly http: HttpClient,
  ) {}

  getcountriesByRegion(region: string): Observable<CountrySmall[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=name,cca3`;
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryByCode(code: string): Observable<Country | null> {
    if ( !code ) return of(null);

    const url = `https://restcountries.com/v2/alpha/${code}`
    return this.http.get<Country>(url);
  }

  getCountryByCodeSmall(code: string): Observable<CountrySmall> {
    const url: string = `${this.baseUrl}/alpha/${code}?fields=name,cca3`;
    return this.http.get<CountrySmall>(url);
  }

  getCountriesByCodes(borders: string[]): Observable<CountrySmall[]> {
    if( !borders ) return of([]);

    const petitions: Observable<CountrySmall>[] = [];

    borders.forEach(code => {
      const petition = this.getCountryByCodeSmall(code);
      petitions.push(petition);
    })

    return combineLatest(petitions);
  }
}

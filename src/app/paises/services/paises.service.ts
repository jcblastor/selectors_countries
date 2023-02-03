import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { CountrySmall } from '../interfaces/countries.interface';

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
}

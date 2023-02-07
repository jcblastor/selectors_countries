import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PaisesService } from '../services/paises.service';
import { CountrySmall, Country } from '../interfaces/countries.interface';
import { first, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  loading: boolean = false;

  // llenar selector region
  regiones: string[] = [];
  //llenar selector paises
  countries: CountrySmall[] = [];
  //llenar selector fronteras
  borders: CountrySmall[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly paisesService: PaisesService,
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    //detectar cambio de region
    this.miFormulario.get('region')?.valueChanges.pipe(
      // reseteamos el valor del campo country cada vez que cambie de region
      tap( (_) => {
        this.loading = true
        this.miFormulario.get('country')?.reset('');
      }),
      // obtiene la respuesta y devuelve un observable, con la nueva info
      switchMap(region => this.paisesService.getcountriesByRegion(region) )
    ).subscribe( countries => {
      this.countries = countries;
      this.loading = false
    });

    this.miFormulario.get('country')?.valueChanges.pipe(
      tap( (_) => {
        this.loading = true;
        this.miFormulario.get('borders')?.reset('');
      }),
      switchMap( code => this.paisesService.getCountryByCode(code) ),
      switchMap( country => this.paisesService.getCountriesByCodes(country?.borders!) )
    ).subscribe( countries => {
      this.borders = countries;
      this.loading = false;
    })
  }

  guardar() {
    console.log(this.miFormulario.value)
  }
}

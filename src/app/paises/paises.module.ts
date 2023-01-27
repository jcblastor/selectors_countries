import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaisesRoutingModule } from './paises-routing.module';

import { SelectorPageComponent } from './pages/selector-page.component';

@NgModule({
  declarations: [
    SelectorPageComponent,
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule
  ],
  exports: []
})
export class PaisesModule {

}

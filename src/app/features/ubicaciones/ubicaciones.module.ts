import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionesRoutingModule } from './ubicaciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UbicacionesRoutingModule,
    SharedModule
  ]
})
export class UbicacionesModule { }

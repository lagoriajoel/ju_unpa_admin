import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionesRoutingModule } from './ubicaciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UbicacionesHomeComponent } from './ubicaciones-home/ubicaciones-home.component';
import { AddUbicacionesComponent } from './add-ubicaciones/add-ubicaciones.component';


@NgModule({
  declarations: [
    UbicacionesHomeComponent,
    AddUbicacionesComponent
  ],
  imports: [
    CommonModule,
    UbicacionesRoutingModule,
    SharedModule
  ]
})
export class UbicacionesModule { }

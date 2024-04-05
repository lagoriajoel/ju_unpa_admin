import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InformacionHomeComponent } from './informacion-home/informacion-home.component';
import { AddInfoComponent } from './add-info/add-info.component';


@NgModule({
  declarations: [
    InformacionHomeComponent,
    AddInfoComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule,
    SharedModule
  ]
})
export class InformacionModule { }

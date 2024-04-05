import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { UbicacionesHomeComponent } from './ubicaciones-home/ubicaciones-home.component';
import { AddUbicacionesComponent } from './add-ubicaciones/add-ubicaciones.component';

const routes: Routes =  [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component:UbicacionesHomeComponent},
      { path: 'addUbicacion', component:AddUbicacionesComponent},

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionesRoutingModule { }

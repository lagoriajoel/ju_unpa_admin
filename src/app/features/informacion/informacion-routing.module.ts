import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { InformacionHomeComponent } from './informacion-home/informacion-home.component';
import { AddInfoComponent } from './add-info/add-info.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: InformacionHomeComponent },
      { path: 'addInfo', component: AddInfoComponent },

    ]
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }

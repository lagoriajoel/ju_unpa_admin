import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from 'src/app/core/Entities/Location';
import { LocationService } from 'src/app/core/services/location.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddUbicacionesComponent } from '../add-ubicaciones/add-ubicaciones.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ubicaciones-home',
  templateUrl: './ubicaciones-home.component.html',
  styleUrls: ['./ubicaciones-home.component.css']
})
export class UbicacionesHomeComponent {


  loading: boolean = true;
  informaciones: Location[]= [];
  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.informaciones);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
 
    constructor(private router: Router,
     private locationService: LocationService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      ) { 
         
          this.dataSource = new MatTableDataSource();
    }
  listarInformacion(){
    this.locationService.lista().subscribe({
      next: data=>{
        console.log(data);
        this.informaciones=data
        this.dataSource.data = data;
    
        this.dataSource.sort = this.sort;
      }
    })
  }
    ngOnInit(): void {
      this.listarInformacion()
    }


  addEditLocation(id?: number) {
    const dialogRef = this.dialog.open(AddUbicacionesComponent, {
      width: "500px",
      disableClose: true,
     data: { id: id },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarInformacion();
      }
    });
  }
  eliminar(id: number) {
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
   data: {
    title:"Eliminar Ubicaión",
    message:"¿Esta seguro de eliminar la Ubicación?"
   }
   
  
    }).afterClosed().subscribe((res) => {
  
     if(res){
      this.locationService.delete(id).subscribe(() => {
        this.listarInformacion();
        
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
     }
  
    });
    this.loading = true;
  }

}

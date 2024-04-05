import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { information } from 'src/app/core/Entities/information';
import { InfoService } from 'src/app/core/services/info.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddInfoComponent } from '../add-info/add-info.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-informacion-home',
  templateUrl: './informacion-home.component.html',
  styleUrls: ['./informacion-home.component.css']
})
export class InformacionHomeComponent {

  loading: boolean = true;
  informaciones: information[]= [];
  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.informaciones);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
 
    constructor(private router: Router,
     private infoService: InfoService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      ) { 
         
          this.dataSource = new MatTableDataSource();
    }
  listarInformacion(){
    this.infoService.lista().subscribe({
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


  addEditInformacion(id?: number) {
    const dialogRef = this.dialog.open(AddInfoComponent, {
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
    title:"Eliminar Novedad",
    message:"¿Esta seguro de eliminar la Novedad?"
   }
   
  
    }).afterClosed().subscribe((res) => {
  
     if(res){
      this.infoService.delete(id).subscribe(() => {
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

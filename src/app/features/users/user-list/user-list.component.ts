import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NGXLogger } from 'ngx-logger';
import { usuario } from 'src/app/core/Entities/usuario';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loading: boolean=false
  administadores:usuario[]=[];
 
   displayedColumns: string[] = ["nombre","nombreUsuario","roles","acciones"];
   dataSource = new MatTableDataSource(this.administadores);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(
     private logger: NGXLogger,
     private notificationService: NotificationService,
     private titleService: Title,
     private _adminService: AuthenticationService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
     private router: Router,
   
     private route: ActivatedRoute
 
   ) {
     this.dataSource = new MatTableDataSource();
   }
 
   ngOnInit() {
    
     this.dataSource.sort = this.sort;
     this.cargarProfesores();
    
 
    
     
   }
   cargarProfesores(): void {
     
     this._adminService.list().subscribe(data => {
       this.dataSource.data = data;
       console.log("admin");
       console.log(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      
     })

}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

addEditProfesor(id?: number) {
  const dialogRef = this.dialog.open(AddUserComponent, {
    width: "550px",
    disableClose: true,
    data: { id: id },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.cargarProfesores();
    }
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

deleteProfesor(id: number) {
  
  

  setTimeout(() => {
    this._adminService.delete(id).subscribe(() => {
      this.cargarProfesores();
      this.mensajeExito();
    })
  }, 1000);
}
mensajeExito() {
  this._snackBar.open('La persona fue eliminada con exito', '', {
    duration: 2000
  });
}





}

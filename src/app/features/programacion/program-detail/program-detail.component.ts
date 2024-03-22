import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { equipo } from 'src/app/core/Entities/equipo';
import { fecha } from 'src/app/core/Entities/fecha';
import { torneo } from 'src/app/core/Entities/torneo';
import { equipoService } from 'src/app/core/services/equipo.service';
import { fechaService } from 'src/app/core/services/fecha.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { torneoService } from 'src/app/core/services/torneo.Service';
import { AddProgramComponent } from '../add-program/add-program.component';
import { EditResultComponent } from '../edit-result/edit-result.component';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
equipos: equipo[]= [];
fechas: fecha[]= [];
fechasPrueba: fecha[]= [];

nombreTorneo: string=""
isUser: boolean = false
torneo_id!: number
  constructor(
    private equipoService: equipoService,
    private route: ActivatedRoute,
    private torneoService: torneoService,
    private fechaService: fechaService,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.torneo_id=Number(params.get("torneo_id"))
      params.get("isUser")=='true' ? this.isUser==true : this.isUser==false
      
      }
    )
    this.listarEquiposPorTorneo(this.torneo_id)
    this.listarFechasPorTorneo(this.torneo_id)
    this.listarTorneo(this.torneo_id)
  
   }

  ngOnInit(): void {
  }
  listarTorneo(torneoId: number): void {
    this.torneoService.detail(torneoId).subscribe({
      next: data=>{
        this.nombreTorneo=data.nombre
      }
    })
  }
  listarFechasPorTorneo(id: number): void {
    this.fechaService.listaPorTorneo(id).subscribe({
      next: data=> {


        this.fechas=data
     

      
       
      }
    })
  }
  listarEquiposPorTorneo(id: number): void {
    this.equipoService.listaPorTorneo(id).subscribe({
      next: data=> {
        this.equipos = data

      
      }
    })
  }

  EditGame(id: number): void {
    const dialogRef = this.dialog.open(AddProgramComponent, {
      width: "300px",
      disableClose: true,
     data: { idGame: id },
     
    });
  
    dialogRef.afterClosed().subscribe({
      next: data=>{
        if(data)
        this.listarEquiposPorTorneo(this.torneo_id);
        this.listarFechasPorTorneo(this.torneo_id)
        this.listarTorneo(this.torneo_id)
      }
    });

  }
  EditResultGame(id: number): void {
    const dialogRef = this.dialog.open(EditResultComponent, {
      width: "300px",
      disableClose: true,
     data: { idGame: id },
     
    });
  
    dialogRef.afterClosed().subscribe({
      next: data=>{
        if(data)
        this.listarEquiposPorTorneo(this.torneo_id);
        this.listarFechasPorTorneo(this.torneo_id)
        this.listarTorneo(this.torneo_id)
      }
    });

  }
}


import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  Component,Inject, OnInit,} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { disciplina } from "src/app/core/Entities/disciplina";
import { disciplinaService } from "src/app/core/services/disciplina.service";
import { equipo } from "src/app/core/Entities/equipo";
import { equipoService } from "src/app/core/services/equipo.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {MatChipsModule} from '@angular/material/chips';
import { NotificationService } from "src/app/core/services/notification.service";
import { torneoService } from "src/app/core/services/torneo.Service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { torneoDTO } from "src/app/core/Entities/dto/torneoDTO";
import { equipoDTO } from "src/app/core/Entities/dto/equipoDTO";
import { disciplinaIdDTO } from "src/app/core/Entities/dto/disciplinaIdDTO";




@Component({
  selector: "app-add-edit-torneos",
  templateUrl: "./add-edit-torneos.component.html",
  styleUrls: ["./add-edit-torneos.component.css"],
})
export class AddEditTorneosComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
 
  disciplinaSlected!: disciplina;
  disciplinas: disciplina[] = [];
  equipos: equipoDTO[] = [];
  torneo_id!: number;
rondas: number[] = [1,2];
rondaSelected!: number;
 

  constructor(
    public dialogRef: MatDialogRef<AddEditTorneosComponent>,
    private _formBuilder: FormBuilder,
    private disciplinaService: disciplinaService,
    private equipoService: equipoService,
    private notificationService: NotificationService,
    private torneoService: torneoService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cargarDisciplina();
   // this.cargarEquipos();

    this.form = this.fb.group({
      disciplina: ["", [Validators.required, Validators.maxLength(100)]],
     
      rondas: ["", [Validators.required]],

   
    });
    
  }
 
  ngOnInit(): void {}
  cargarEquipos(): void {
    this.equipoService.lista().subscribe({
      next: (data) => {
        this.equipos = data;
        console.log(data);
      },
    });
  }

 

  cargarDisciplina(): void {
    this.disciplinaService.lista().subscribe({
      next: (data) => {
        this.disciplinas = data;
      },
    });
  }

  cargarEquiposPorDisciplina(id: number): void {
    this.disciplinaSlected = this.disciplinas.find((d) => d.id == id)!;
    console.log(this.disciplinaSlected);
    this.equipoService.listaPorDisciplina(id).subscribe({
      next: (data) => {
        this.equipos = data;
        console.log(data);
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      },
    });
  }
  

  

  cancelar() {
    this.dialogRef.close();
  }
  addTorneo(): void {
    
    if(this.form.invalid){
      return
    }
    if(this.equipos.length==1||this.equipos.length==0){
      return
    }
  
    const disciplinaId: disciplinaIdDTO= {
      id: this.disciplinaSlected.id
    }
    const torneo: torneoDTO = {
      type: "round robin",
      name: "CAMPEONATO DE " + this.disciplinaSlected.name.toUpperCase() + " " + this.disciplinaSlected.category.toUpperCase(),
      numTeams: this.equipos.length,
      sport: disciplinaId 
    };

    this.torneoService.save(torneo).subscribe({
      next: (data) => {

        this.torneoService.addEquipos(this.equipos, data.id, this.form.value.rondas).subscribe({
          next: (data) => {
            this.mensajeExito("agregado");
            this.dialogRef.close(true);
          }
        });
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      },
    });

   
   
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El Torneo fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}

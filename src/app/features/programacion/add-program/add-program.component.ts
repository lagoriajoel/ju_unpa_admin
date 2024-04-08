import { DatePipe } from '@angular/common';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { equipoIdDto } from 'src/app/core/Entities/dto/equipoIdDto';
import { fechaIdDto } from 'src/app/core/Entities/dto/fechaIdDto';
import { gameDTO } from 'src/app/core/Entities/dto/gameDTO';
import { game } from 'src/app/core/Entities/game';
import { gameService } from 'src/app/core/services/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
export interface hora {
  hora: string;
  minutos: string;
}
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
  providers:[DatePipe]
})
export class AddProgramComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  idGame: number;
  horario!:string
  game!: game

   
  constructor(
    public dialogRef: MatDialogRef<AddProgramComponent>,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private notificationService: NotificationService,
    private gameService: gameService,   
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      lugar: ["", [Validators.required, Validators.maxLength(100)]],
      fecha: ["", [Validators.required]],
      hora: ["", [Validators.required]],

  
      
    });
  this.datepipe
    this.idGame = data.idGame;
    console.log(this.idGame);
    this.getGame(this.idGame);
  }
  
  ngOnInit(): void {
    this.esEditar(this.idGame);
  }

  getGame(idGame: number):void {
     this.gameService.detail(idGame).subscribe({
      next: data=> {
        this.game = data
        console.log(this.game);
      }
     })    
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
    
      
    }
  }

  
  cancelar() {
    this.dialogRef.close(false);
  }

  EditGame() {
    if (this.form.invalid) {
      return;
    }



  this.game.place = this.form.value.lugar
  this.game.date = this.datepipe.transform(this.form.value.fecha,"dd/MM/yyyy")!
  this.game.schedule = this.form.value.hora

  console.log(this.game.schedule);

    

    this.gameService.update(this.idGame, this.game).subscribe({
      next: data=> {
        this.mensajeExito("Actulizado")
        this.dialogRef.close()
      },
      error: error=> {
        this.notificationService.openSnackBar(error.error.Mensaje)
      }
    })
   
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El Encuentro fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}

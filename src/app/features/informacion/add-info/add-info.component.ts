import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { information } from 'src/app/core/Entities/information';
import { InfoService } from 'src/app/core/services/info.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent {
  form: FormGroup;

  loading: boolean;
  operacion: string = "Agregar ";
  id: number | undefined;
  

  constructor(
    public dialogRef: MatDialogRef<AddInfoComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
   private infoService: InfoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loading = false;
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      body: ["", [Validators.required]],
   

    });

    this.id = data.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getInfo(id);
      
    }
  }

  getInfo(id: number) {
        
   this.infoService.listaPorId(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
      title: data.title_info,
      body: data.body_info,
    
     
    
  
    })
  },
  error: (error) => {
    this.notificationService.openSnackBar(error.error)
  }

   })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditUnidad() {
    if (this.form.invalid) {
      return;
    }
   

    const info: information = {
      id:0,
      title_info: this.form.value.title,
      body_info: this.form.value.body,
     
    };

  
    setTimeout(()=>{  this.loading=true},5)
    if (this.id == undefined) {
      // Es agregar
      this.infoService.save(info).subscribe(
        {
          next: () => {
        this.mensajeExito("agregado");
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error)
      }
        }
      );
    } else {
      // Es editar
      this.infoService.update(this.id, info).subscribe((data) => {
        this.mensajeExito("actualizado");
        this.dialogRef.close(true);
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El contenido fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}

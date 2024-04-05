import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from 'src/app/core/Entities/Location';
import { LocationService } from 'src/app/core/services/location.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-ubicaciones',
  templateUrl: './add-ubicaciones.component.html',
  styleUrls: ['./add-ubicaciones.component.css']
})
export class AddUbicacionesComponent {
  form: FormGroup;

  loading: boolean;
  operacion: string = "Agregar ";
  id: number | undefined;
  

  constructor(
    public dialogRef: MatDialogRef<AddUbicacionesComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
   private locationService: LocationService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loading = false;
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],

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
        
   this.locationService.listaPorId(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude
    
     
    
  
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
   

    const location: Location = {
      id:0,
      name: this.form.value.name,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude
     
    };

  
    setTimeout(()=>{  this.loading=true},5)
    if (this.id == undefined) {
      // Es agregar
      this.locationService.save(location).subscribe(
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
      this.locationService.update(this.id, location).subscribe((data) => {
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

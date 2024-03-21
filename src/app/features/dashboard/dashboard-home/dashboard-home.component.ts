import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { disciplina } from 'src/app/core/Entities/disciplina';
import { Router } from '@angular/router';
import { torneoService } from 'src/app/core/services/torneo.Service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  disciplinas: disciplina[] =[]
  
  nombreUsuario: string=''
  usuario: string=''
  isAdmin: boolean = false;
  isProfesor: boolean = false; //

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
   private disciplinaService:disciplinaService,
   private torneoService: torneoService,
   private router: Router,
    private titleService: Title,
    private logger: NGXLogger) {
      this.listarDisciplinas()
  }

  ngOnInit() {
    this.nombreUsuario=this.authService.getName()
    this.isAdmin = this.authService.isAdmin();
  
    this.isProfesor=this.authService.isProfesor();
    
    if(this.isAdmin){
        this.usuario= 'Administrador :';
    }
    else if(this.isProfesor){
        this.usuario='Profesor :';
    }

  }

  listarDisciplinas(){
    this.disciplinaService.lista().subscribe({
      next: data=>{
        console.log(data);
        this.disciplinas=data
      }
    })
  }
  toFixture(idDisciplina: number): void {
   
    this.torneoService.listaPorDisciplina(idDisciplina).subscribe({
      next: data=>{
            console.log(data);
            this.router.navigate(["/programa"], { 
              queryParams:{
                torneo_id: data.id,
                isUser: true
              }
            })
      },
      error: error => {
        this.notificationService.openSnackBar(error.error.Mensaje)
      }
    })
}
toClasification(id: number): void {
this.router.navigate(['dashboard/clasificacion'], {
    queryParams: {
      id: id,
    }
});
}
}

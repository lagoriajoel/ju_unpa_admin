import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { information } from "../Entities/information";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class InfoService {
  
    ContenidoURL = environment.apiURL +'/info/'
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<information[]> {
      return this.httpClient.get<information[]>(this.ContenidoURL + 'list');
    }

   
    public listaPorId(id:Number): Observable<information> {
      return this.httpClient.get<information>(this.ContenidoURL + `list/${id}`);
    }
 
  
    public save(disciplina: information): Observable<any> {
        return this.httpClient.post<any>(this.ContenidoURL + 'save', disciplina);
      }
    
      public update(id: number, disciplina: information): Observable<any> {
        return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, disciplina);
      }
    
      public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
      }
    
}
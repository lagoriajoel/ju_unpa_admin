import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { information } from "../Entities/information";
import { Observable } from "rxjs";
import { Location } from "../Entities/Location";


@Injectable({
    providedIn: 'root'
  })
  export class LocationService {
  
    ContenidoURL = environment.apiURL+'/location/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<Location[]> {
      return this.httpClient.get<Location[]>(this.ContenidoURL + 'list');
    }

   
    public listaPorId(id:Number): Observable<Location> {
      return this.httpClient.get<Location>(this.ContenidoURL + `list/${id}`);
    }
 
  
    public save(location: Location): Observable<any> {
        return this.httpClient.post<any>(this.ContenidoURL + 'save', location);
      }
    
      public update(id: number, location: Location): Observable<any> {
        return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, location);
      }
    
      public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
      }
    
}
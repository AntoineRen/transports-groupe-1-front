import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { VehiculeServeur } from './vehiculeServeur.domains';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.baseUrl + 'vehicule/';

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {

  constructor(private http: HttpClient) { }

  requestGetVehicules(): Observable<VehiculeServeur[]>{
    return this.http.get<VehiculeServeur[]>(URL_BACKEND);
  }
}

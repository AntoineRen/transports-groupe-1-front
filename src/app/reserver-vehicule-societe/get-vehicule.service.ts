import { Injectable } from '@angular/core';
import { VehiculeServeur } from './vehiculeServeur.domains';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'vehicule/';

@Injectable({
  providedIn: 'root'
})
export class GetVehiculeService {

  constructor(private http: HttpClient) { }

  public getAllVehicule(): Observable<VehiculeServeur[]>{
    return this.http.get<VehiculeServeur[]>(URL_BACKEND);
  }
}

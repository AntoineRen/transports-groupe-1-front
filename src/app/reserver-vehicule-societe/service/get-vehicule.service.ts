import { Injectable } from '@angular/core';
import { VehiculeServeur } from '../domains/vehiculeServeur.domains';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Periode } from '../domains/periode.domains';
import { DisponibiliteVehicule } from '../domains/disponibiliteVehicule.domains';

const URL_BACKEND = environment.baseUrl + 'vehicule/';

/** Service permettant de faire la liason avec le serveur sur les demandes concernant les véhicules */
@Injectable({
  providedIn: 'root'
})
export class GetVehiculeService {

  constructor(private http: HttpClient) { }

  /** Recupère tout les véhicules de sociétés du serveur */
  public getAllVehicule(): Observable<VehiculeServeur[]>{
    return this.http.get<VehiculeServeur[]>(URL_BACKEND);
  }

  /** Récupère la disponibilité de tous les véhicules de société du serveur en fonction d'une période donnée */
  public getDispoAllVehicules(periode: Periode): Observable<DisponibiliteVehicule[]>{
    return this.http.post<DisponibiliteVehicule[]>(`${URL_BACKEND}disponibilite`, periode);
  }
}

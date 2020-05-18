import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../vehicules/vehicule';
import { environment } from 'src/environments/environment';
import { ReservationVehiculeServeur } from './details-vehicule.model';


const URL_BACKEND_VEHICULE = environment.baseUrl + 'vehicule/';

const URL_BACKEND_RESERVATION = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class DetailsVehiculeService {
  immatriculation: string

  constructor(private http: HttpClient) { }

  getvehiculeByImmatriculation(immatriculation): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${URL_BACKEND_VEHICULE}?immatriculation=${immatriculation}`)
  }

  getProchainesReservationsByVehicule(immatriculation): Observable<ReservationVehiculeServeur[]> {
    return this.http.get<ReservationVehiculeServeur[]>(`${URL_BACKEND_RESERVATION}vehicule?encours=true&immat=${immatriculation}`);
  }

  getHistoriqueReservationsByVehicule(immatriculation): Observable<ReservationVehiculeServeur[]> {
    return this.http.get<ReservationVehiculeServeur[]>(`${URL_BACKEND_RESERVATION}vehicule?encours=false&immat=${immatriculation}`);
  }
}

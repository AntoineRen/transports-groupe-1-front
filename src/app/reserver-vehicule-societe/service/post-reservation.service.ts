import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostReservationServeur } from '../domains/postReservationServeur.domains';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class PostReservationService {

  constructor(private http: HttpClient) {}

  /** Ajoute une reservation en base de données */
  public postReservation(reservationServeur: PostReservationServeur){
    return this.http.post(URL_BACKEND, reservationServeur);
  }
}

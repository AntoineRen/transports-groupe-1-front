import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Reservation } from './reservation.domains';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

const URL_BACKEND = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  /** Subject contenant les reservations de véhicule de société d'un collègue */
  private subjectReservation = new Subject<Reservation[]>();

  constructor(private http: HttpClient) { }

  /** Effectue une requete pour obtenir la liste des réservations de véhicule de société
   * d'un collegue en fonction de son email et push le résultat dans le subjectReservation
   */
  requestGetReservations(email: string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(URL_BACKEND + '?email=' + email);
  }

}

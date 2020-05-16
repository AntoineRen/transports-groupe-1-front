import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationServeur } from '../domains/reservationServeur.domains';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Periode } from '../domains/periode.domains';
import { map } from 'rxjs/operators';

const URL_BACKEND = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class OccupationChauffeurService {

  constructor(private http: HttpClient) { }

  /** Effectue une requete pour récupérer toutes les réservations selon une periode et les transforment en période */
  public getReservationsPeriode(dateDebut: NgbDateStruct, dateFin: NgbDateStruct): Observable<Periode[]>{

    return this.http.get<ReservationServeur[]>(`${URL_BACKEND}?debut=${this.formatDate(dateDebut)}&fin=${this.formatDate(dateFin)}`)
    .pipe(
      map(reservations =>
            reservations.map(
              reservation => new Periode(new Date(reservation.dateDepart), new Date(reservation.dateArrivee))
              )),
    );
  }

  /** Ajoute un 0 devant un chiffre < 10 */
  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  /** Formate une date au format UTC */
  private formatDate(date: NgbDateStruct): string{

    return `${this.step(date.year)}-${this.step(date.month)}-${this.step(date.day)}`;
  }
}

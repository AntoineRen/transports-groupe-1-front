import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { ReservationServeur } from '../domains/reservationServeur.domains';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class ReservationChauffeurService {

  constructor(private http: HttpClient) { }

  /** Recupere les réservations lié au chauffeur courant et les renvoies sous la forme de calendar events */
  public getReservationChauffeur(): Observable<CalendarEvent[]> {

    return this.http.get<ReservationServeur[]>(`${URL_BACKEND}chauffeur`)
    .pipe(
      map(reservations => reservations.map(reservation => this.reservationServeurToCalendarEvent(reservation)))
    );
  }

  /** Recupere les réservations en attente de chauffeur et les renvoies sous la forme de calendar events */
  public getReservationEnAttente(): Observable<CalendarEvent[]> {

    return this.http.get<ReservationServeur[]>(`${URL_BACKEND}enattente`)
    .pipe(
      map(reservations => reservations.map(reservation => this.reservationServeurToCalendarEvent(reservation)))
    );
  }

  /** Transforme une reservation réceptionné du serveur en objet CalendarEvent */
  private reservationServeurToCalendarEvent(reservation: ReservationServeur): CalendarEvent{

    const calendarEvent = {
      start: new Date(reservation.dateDepart),
      end: new Date(reservation.dateArrivee),
      title: `reservation n° ${reservation.id}`,
      color: null,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      meta: {
        statut: reservation.statutDemandeChauffeur,
        responsable: reservation.responsable,
        vehicule: reservation.vehicule,
      },
      draggable: false
    };

    return calendarEvent;

  }

}

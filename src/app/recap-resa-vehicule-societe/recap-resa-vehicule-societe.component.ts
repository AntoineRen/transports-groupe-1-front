import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Reservation } from './reservation.domains';
import { ReservationsService } from './reservations.service';

@Component({
  selector: 'app-recap-resa-vehicule-societe',
  templateUrl: './recap-resa-vehicule-societe.component.html',
  styleUrls: ['./recap-resa-vehicule-societe.component.scss']
})
export class RecapResaVehiculeSocieteComponent implements OnInit {

  @Input() col: Collegue;
  reservationsCourantes: Reservation[];
  reservationsHistorique: Reservation[];
  start = 0;
  size = 3;

  constructor(private reservationsService: ReservationsService) { }

  refreshReservationsCourantes(): void {
    this.reservationsService.requestGetReservationsEnCours(this.col.email).subscribe(

      listeResaServeur =>
      this.reservationsCourantes = listeResaServeur
      .map(reservationServeur => new Reservation(reservationServeur)),

      error => console.log('Oups'),
    );
  }

  refreshReservationsHistorique(start: number, size: number){
    this.reservationsService.requestGetReservationsHisto(this.col.email, start, size).subscribe(

      listeResaServeur =>
      this.reservationsHistorique = listeResaServeur
      .map(reservationServeur => new Reservation(reservationServeur)),

      error => console.log('Oups'),
    );
  }

  ngOnInit(): void {
    // recuperation des listes de reservations du collegue courant
    this.refreshReservationsCourantes();
    this.refreshReservationsHistorique(this.start, this.size);
  }

}

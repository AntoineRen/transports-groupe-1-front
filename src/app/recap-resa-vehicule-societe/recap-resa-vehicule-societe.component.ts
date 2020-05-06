import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Reservation } from './reservation.domains';
import { ReservationsService } from './reservations.service';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recap-resa-vehicule-societe',
  templateUrl: './recap-resa-vehicule-societe.component.html',
  styleUrls: ['./recap-resa-vehicule-societe.component.scss']
})
export class RecapResaVehiculeSocieteComponent implements OnInit {

  @Input() col: Collegue;
  reservationsCourantes: Reservation[];
  reservationsHistorique: Reservation[];
  reservationsHistoriqueAffiche: Reservation[];
  start = 0;
  end = 3;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  constructor(private reservationsService: ReservationsService) { }

  refreshReservationsCourantes(): void {
    this.reservationsService.requestGetReservationsEnCours(this.col.email)
    .subscribe(
      listeResaServeur =>
      this.reservationsCourantes = listeResaServeur
        .map(reservationServeur => new Reservation(reservationServeur)),

      error => console.log('Oups'),
    );
  }

  refreshReservationsHistorique(){
    this.reservationsService.requestGetReservationsHisto(this.col.email)
    .subscribe(
      listeResaServeur => {
      this.reservationsHistorique = listeResaServeur
        .map(reservationServeur => new Reservation(reservationServeur));
      this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);
      },

      error => console.log('Oups'),
    );
  }

  pagePrecedente(){
    this.start -= 3;
    this.end -= 3;
    this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);
  }

  pageSuivante(){
    this.start += 3;
    this.end += 3;
    this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);
  }

  ngOnInit(): void {
    // recuperation des listes de reservations du collegue courant
    this.refreshReservationsCourantes();
    this.refreshReservationsHistorique();
  }

}

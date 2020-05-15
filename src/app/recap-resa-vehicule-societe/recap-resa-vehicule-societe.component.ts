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

  // pagination
  nbReservationsParPages = 3;
  start = 0;
  end = this.nbReservationsParPages;
  pageActuelle = 1;
  nombrePagemax: number;

  // font awesome
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  // erreur
  erreurReservationEnCours = false;
  erreurReservationHisto = false;
  reservationEnCoursVide = false;
  reservationHistoVide = false;

  constructor(private reservationsService: ReservationsService) { }

  refreshReservationsCourantes(): void {
    this.reservationsService.requestGetReservationsEnCours()
    .subscribe(
      listeResaServeur => {
      this.reservationsCourantes = listeResaServeur
        .map(reservationServeur => new Reservation(reservationServeur));

      this.reservationEnCoursVide = this.reservationsCourantes.length === 0;
      },
      error => this.erreurReservationEnCours = true,
    );
  }

  refreshReservationsHistorique(){
    this.reservationsService.requestGetReservationsHisto()
    .subscribe(
      listeResaServeur => {
      this.reservationsHistorique = listeResaServeur
        .map(reservationServeur => new Reservation(reservationServeur));

      this.nombrePagemax = Math.ceil(this.reservationsHistorique.length / this.nbReservationsParPages);

      this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);

      this.reservationHistoVide = this.reservationsHistorique.length === 0;
      },

      error => this.erreurReservationHisto = true,
    );
  }

  pagePrecedente(){
    if (this.pageActuelle - 1 > 0){
      this.pageActuelle -= 1;
      this.end = this.pageActuelle * this.nbReservationsParPages;
      this.start = this.end - this.nbReservationsParPages;
    }

    this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);
  }

  pageSuivante(){
    if (this.pageActuelle + 1 <= this.nombrePagemax){
      this.pageActuelle += 1;
      this.end = this.pageActuelle * this.nbReservationsParPages;
      this.start = this.end - this.nbReservationsParPages;
    }

    this.reservationsHistoriqueAffiche = this.reservationsHistorique.slice(this.start, this.end);
  }

  ngOnInit(): void {
    // recuperation des listes de reservations du collegue courant
    this.refreshReservationsCourantes();
    this.refreshReservationsHistorique();
  }

}

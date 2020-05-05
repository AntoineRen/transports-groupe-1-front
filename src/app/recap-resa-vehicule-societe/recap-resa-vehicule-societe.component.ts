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
  listeReservations: Reservation[];
  reservationsCourantes: Reservation[];
  reservationsHistorique: Reservation[];

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    // recuperation de la liste des reservations du collegue courant
    this.reservationsService.requestGetReservations(this.col.email).subscribe(
      listeResaServeur => this.listeReservations = listeResaServeur.map(resaServeur => new Reservation(resaServeur)),
      error => console.log('Oups'),
    );
  }

}

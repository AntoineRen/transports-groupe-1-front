import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { ListCovoiturageService } from './list-covoiturage.service';
import CovoitAnnonce from './covoitAnnonce.model';


@Component({
  selector: 'app-list-reservation-covoiturages',
  templateUrl: './list-reservation-covoiturages.component.html',
  styleUrls: ['./list-reservation-covoiturages.component.scss']
})
export class ListReservationCovoituragesComponent implements OnInit {
  @Input() col: Collegue;
  listAnnonces: CovoitAnnonce[];
  messError: string;
  constructor(private covServices: ListCovoiturageService) { }

  ngOnInit(): void {
    /*Reccuperation de la liste des annonces au chargement du composant  list-reservation-covoiturage via appel au service*/
    this.covServices.recupererListAnnonceCovoit(this.col.email).subscribe(Annonces => this.listAnnonces = Annonces,
      err => this.messError = 'erreur sub List Annonces',
      () => { });

  };

}

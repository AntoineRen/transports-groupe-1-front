import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { ListCovoiturageService } from './list-covoiturage.service';
import { CovoitAnnonce } from './models/CovoitAnnonce.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovoitAnnonceResume } from './modalComponnent/CovoitAnnonceResume.modal-component';

/*Pour test*/
import CovoitAnnonceServer from './models/CovoitAnnonceServer.model';


@Component({
  selector: 'app-list-reservation-covoiturages',
  templateUrl: './list-reservation-covoiturages.component.html',
  styleUrls: ['./list-reservation-covoiturages.component.scss']
})
export class ListReservationCovoituragesComponent implements OnInit {
  @Input() col: Collegue;
  listAnnoncesEncours: CovoitAnnonce[];
  listAnnoncesHistorique: CovoitAnnonce[];
  covoitExemple: CovoitAnnonceServer[];
  messError: string;
  constructor(private covoitServices: ListCovoiturageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    /*Reccuperation de la liste des annonces au chargement du composant  list-reservation-covoiturage via appel au service*/
    // tslint:disable-next-line: max-line-length
    this.covoitServices.recupererListAnnonceCovoitEncours().subscribe(listeAnnonceServer => this.listAnnoncesEncours = listeAnnonceServer.map(covoiturageAnnonces => new CovoitAnnonce(covoiturageAnnonces)),
      err => this.messError = 'erreur sub List Annonces en cours',
      () => { });
    // tslint:disable-next-line: max-line-length
    this.covoitServices.recupererListAnnonceCovoitHistorique().subscribe(listeAnnonceServer => this.listAnnoncesHistorique = listeAnnonceServer.map(covoiturageAnnonces => new CovoitAnnonce(covoiturageAnnonces)),
      err => this.messError = 'erreur sub List Annonces historique',
      () => { });


  };
  open(annonceRecup: CovoitAnnonceResume) {
    /* l'instantce de NgbModal utilise le methode open qui prend en paramettre le composant fenetre modal*/
    const modalRef = this.modalService.open(CovoitAnnonceResume);
    /*Champ "annonce " (présent en input du composant fenetre modal) est remplis avec l'annonceRecup */
    modalRef.componentInstance.annonce = annonceRecup;
  }


}

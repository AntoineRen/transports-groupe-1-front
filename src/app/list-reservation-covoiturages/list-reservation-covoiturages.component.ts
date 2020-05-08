import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { ListCovoiturageService } from './list-covoiturage.service';
import { CovoitAnnonce } from './models/CovoitAnnonce.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovoitAnnonceResume } from './modalComponnent/CovoitAnnonceResume.modal-component';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-list-reservation-covoiturages',
  templateUrl: './list-reservation-covoiturages.component.html',
  styleUrls: ['./list-reservation-covoiturages.component.scss']
})
export class ListReservationCovoituragesComponent implements OnInit {

  //input reccuperé du composant general
  @Input() col: Collegue;

  listAnnoncesEncours: CovoitAnnonce[];
  listAnnoncesHistorique: CovoitAnnonce[];
  listAnnoncesHistoriqueAffichage: CovoitAnnonce[];

  // pagination
  nbAnnoncesParPages = 3;
  start = 0;
  end = this.nbAnnoncesParPages;
  pageActuelle = 1;
  nombrePagemax: number;

  // font awesome
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  // erreur
  annonceEnCoursVide = false;
  erreurAnnonceEnCours = false;
  annonceHistoVide = false;
  erreurAnnonceHisto = false;


  constructor(private covoitServices: ListCovoiturageService, private modalService: NgbModal) { }

  /*Reccuperation de la liste des annonces au statue en cours*/
  subListAnnoncesEnCour(): void {
    this.covoitServices.recupererListAnnonceCovoitEncours()
      .subscribe(listeAnnonceServer => {
        this.listAnnoncesEncours = listeAnnonceServer
          .map(covoiturageAnnonces => new CovoitAnnonce(covoiturageAnnonces));
        this.annonceEnCoursVide = this.listAnnoncesEncours.length === 0;
      },
        err => {
          this.erreurAnnonceEnCours = true;
        },
      );
  }
  /*Reccuperation historique des annonces */
  subAnnoncesHistorique(): void {
    this.covoitServices.recupererListAnnonceCovoitHistorique()
      .subscribe(listeAnnonceServer => {
        this.listAnnoncesHistorique = listeAnnonceServer
          .map(covoiturageAnnonces => new CovoitAnnonce(covoiturageAnnonces));

        this.nombrePagemax = Math.ceil(this.listAnnoncesHistorique.length / this.nbAnnoncesParPages);

        this.listAnnoncesHistoriqueAffichage = this.listAnnoncesHistorique.slice(this.start, this.end);

        this.annonceHistoVide = this.listAnnoncesHistorique.length === 0;


      },
        err => this.erreurAnnonceHisto = true);
  }

  /*Methode de pagination pour historique des annonce de covoiturage*/
  pagePrecedente() {
    if (this.pageActuelle - 1 > 0) {
      this.pageActuelle -= 1;
      this.end = this.pageActuelle * this.nbAnnoncesParPages;
      this.start = this.end - this.nbAnnoncesParPages;
    }

    this.listAnnoncesHistoriqueAffichage = this.listAnnoncesHistorique.slice(this.start, this.end);
  }

  pageSuivante() {
    if (this.pageActuelle + 1 <= this.nombrePagemax) {
      this.pageActuelle += 1;
      this.end = this.pageActuelle * this.nbAnnoncesParPages;
      this.start = this.end - this.nbAnnoncesParPages;
    }

    this.listAnnoncesHistoriqueAffichage = this.listAnnoncesHistorique.slice(this.start, this.end);
  }







  ngOnInit(): void {
    // recuperation des listes d'annonces du collegue courant
    this.subListAnnoncesEnCour();
    this.subAnnoncesHistorique();

  };

  open(annonceRecup: CovoitAnnonceResume) {
    /* l'instantce de NgbModal utilise le methode open qui prend en paramettre le composant fenetre modal*/
    const modalRef = this.modalService.open(CovoitAnnonceResume);
    /*Champ "annonce " (présent en input du composant fenetre modal) est remplis avec l'annonceRecup */
    modalRef.componentInstance.annonce = annonceRecup;
  }
}

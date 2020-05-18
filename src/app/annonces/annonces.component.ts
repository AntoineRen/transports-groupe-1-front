import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AnnonceService } from '../pub-annonce/annonce.service';
import { Annonce } from '../pub-annonce/annonce';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {


  listAnnoncesEncours: Annonce[];
  listAnnoncesHistorique: Annonce[];
  listAnnoncesHistoriqueAffichage: Annonce[];
  closeResult = '';
  annuler;
  statut;

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
  error = false;

  constructor(private annonceServices: AnnonceService, private modalService: NgbModal, private toastr: ToastrService) { }

   /*Reccuperation de la liste des annonces au statue en cours*/
   subListAnnoncesEnCour(): void {
    this.annonceServices.recupererListAnnonceEncours()
      .subscribe(listeAnnonceServer => {
        this.listAnnoncesEncours = listeAnnonceServer
          .map(CovoitAnnonceServer => new Annonce(CovoitAnnonceServer));
        this.annonceEnCoursVide = this.listAnnoncesEncours.length === 0;
      },
        err => {
          this.erreurAnnonceEnCours = true;
        },
      );
  }
  /*Reccuperation historique des annonces */
  subAnnoncesHistorique(): void {
    this.annonceServices.recupererListAnnonceHistorique()
      .subscribe(listeAnnonceServer => {
        this.listAnnoncesHistorique = listeAnnonceServer
          .map(CovoitAnnonceServer => new Annonce(CovoitAnnonceServer));

        this.nombrePagemax = Math.ceil(this.listAnnoncesHistorique.length / this.nbAnnoncesParPages);

        this.listAnnoncesHistoriqueAffichage = this.listAnnoncesHistorique.slice(this.start, this.end);

        this.annonceHistoVide = this.listAnnoncesHistorique.length === 0;

      },
        err => this.erreurAnnonceHisto = true);
  }

  /*Annulation des annonces */
    annulerAnnonce(id){
      this.annonceServices.annulerAnnonce(id).subscribe(
        () => {this.subListAnnoncesEnCour(),
               this.toastr.success('Votre annonce a été annulé', 'Annonce')},
               error => this.toastr.error("une erreur s'est produite lors de lannulation d'annonce ", 'Annonce')

              );
    }

    /*Methode de pagination pour historique des annonces de covoiturage*/
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


  open(content, id) {
    this.modalService.open(content).result.then(() => {
    this.annulerAnnonce(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.subListAnnoncesEnCour();
    this.subAnnoncesHistorique();
  }

}

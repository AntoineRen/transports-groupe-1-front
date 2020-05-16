import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { FeatureGeocodeJSON } from '../pub-annonce/geocode-json-response';
import { AdresseService } from '../pub-annonce/adresse.service';
import { switchMap, tap, finalize, filter, flatMap, map } from 'rxjs/operators';
import { AnnonceCovoitService } from './service/annonce-covoit.service';
import { CovoitAnnonce } from '../list-reservation-covoiturages/models/CovoitAnnonce.model';
import { ReserverUnCovoitModalComponent } from './modalComponnent/reserver-un-covoit-modal/reserver-un-covoit-modal.component';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Annonce } from '../pub-annonce/annonce';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reserver-covoiturage',
  templateUrl: './reserver-covoiturage.component.html',
  styleUrls: ['./reserver-covoiturage.component.scss']
})
export class ReserverCovoiturageComponent implements OnInit {


  subCovoitAnnonce: Subscription;

  //Detection adresses valides
  adresses: [];
  isLoading = false;

  //list annonce en cours réccupéré du CovoitAnnonceServer
  listAnnoncesCovoit: Annonce[] = [];
  //List filtre rempli par la méthode filtreLieuDepartCovoit()
  listFiltreLieuDepart: Annonce[] = [];
  listFiltreLieuDepart2: Annonce[] = [];

  //Verifications
  erreurGetAnnoncesCovoit = false;

  lieuDepart: string;
  closeResult = '';
  modalRow: any;

  duree;
  distance;
  minute;
  coordDep = [];
  coordDes = [];

  //Construction des champs du reactive Formulaire
  reservationCovoitForm = new FormGroup({
    lieuDepart: new FormControl('', [Validators.required, this.AdresseVaidator]),
    lieuDestination: new FormControl('', [Validators.required, this.AdresseVaidator]),
    dureeTrajet: new FormControl(),
    distance: new FormControl(),
    dateAnn: new FormControl('', [Validators.required, this.dateVaidator]),
  });

  //Constructeur

  constructor(private adresseService: AdresseService,
    private annoncesCovoit: AnnonceCovoitService, private modalService: NgbModal, private servicePut: AnnonceCovoitService,  private router: Router) {

    //Récuperation Adresse Lieu de depart via bakcend
    this.reservationCovoitForm.get('lieuDepart').valueChanges
      .pipe(
        tap(unLieuDepart => {this.filtreLieuDepartCovoit(unLieuDepart),this.coordCalculate(unLieuDepart)}),
        tap(() => this.isLoading = true),
        switchMap(value => this.adresseService.search(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      ).subscribe(response => {
        this.adresses = response.features;
      });
    //Recupération Adresse Lieu de destinaiton  via bakcend
    this.reservationCovoitForm.get('lieuDestination').valueChanges.pipe(
      tap(unLieuDepart => {this.filtreLieuDepartCovoit(unLieuDepart),this.coordCalculate(unLieuDepart)}),
      tap(() => this.isLoading = true),
      switchMap(value => this.adresseService.search(value)
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    ).subscribe(response => {
      this.adresses = response.features;
    });
  }


  coordCalculate(selection) {
    if (typeof selection === 'object' && selection != null) {
      if (this.reservationCovoitForm.get('lieuDepart').value === selection) {
        this.coordDep.push(selection.geometry.coordinates[0], selection.geometry.coordinates[1]);
        if (this.coordDep.length > 2) {
          this.coordDep = this.coordDep.splice(2, 4);
        }
      }
      if (this.reservationCovoitForm.get('lieuDestination').value === selection) {
        this.coordDes.push(selection.geometry.coordinates[0], selection.geometry.coordinates[1]);
        if (this.coordDes.length > 2) {
          this.coordDes = this.coordDes.splice(2, 4);
        }
      }
      if (this.coordDep.length === 2 && this.coordDes.length === 2) {
        const mesCoord = `${this.coordDep[1]},${this.coordDep[0]}&destination=${this.coordDes[1]},${this.coordDes[0]}`;
        this.adresseService.dureeDistanceCalculate(mesCoord).subscribe(data => {
          this.distance = (data.total_distance / 1000).toFixed(2);
          this.duree = ((data.total_time / 3600) | 0);
          this.minute = (((data.total_time % 3600) / 60) | 0);
        });
      }
    }

  }

  //récuperation de toutes les annonces en cours grace au services getAnnonceCovoit
  public getAllAnnonceCovoit() {
   this.annoncesCovoit.getAllAnnonceCovoitEnCourse()
      .subscribe(
        data => {
        this.listAnnoncesCovoit = data
          .map(CovoitAnnonceServer => new Annonce(CovoitAnnonceServer));
          this.erreurGetAnnoncesCovoit = this.listAnnoncesCovoit.length === 0;
        },
        err => {
          this.erreurGetAnnoncesCovoit = true;
        },
      );
  }


  AdresseVaidator(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { incorrect: true };
    }
    return null;
  }
  dateVaidator(control: AbstractControl) {
    const date1 = moment(control.value).format('YYYY-MM-DD');
    const date2 = moment().add(1, 'M').format('YYYY-MM-DD');
    if (date2 === date1) {
      return { dateAujVaidator: true };
    } else if (date1 < date2) {
      return { dateVaidator: true };
    }
    return null;
  }

  adresseFn(adresse?: FeatureGeocodeJSON): string | undefined {
    //active le filtre au moment de la selection de l'adresse dans le bandeau déroulant du champ Lieudepart
    return adresse ? adresse.properties.label : undefined;
  }
  //methode pour filtrer annonce en fonction du lieu de depart, seul les lieu de depart complet sont acceptés

  filtreLieuDepartCovoit(unLieuDepart) {
    this.listFiltreLieuDepart.length = 0;
    if (typeof unLieuDepart === 'object' && unLieuDepart != null ) {
      for (let i = 0; i < this.listAnnoncesCovoit.length; i++) {
        if (this.listAnnoncesCovoit[i].lieuDepart === this.adresseFn(unLieuDepart)) {
          this.listFiltreLieuDepart.push(this.listAnnoncesCovoit[i]);

        }
      }
    }
  }

  //doit ouvrir modal pour réservation
  reserver(reservationCovoit: Annonce) {
    this.servicePut.putReservation(reservationCovoit.id)
      .subscribe((annonce) => {
        this.router.navigate(['/collaborateur/reservations']);
      },
      );
  }

  openModal(targetModal, annonce) {
    this.modalRow = annonce;
    this.modalService.open(targetModal).result.then(() => {
      this.reserver(annonce);
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
    this.getAllAnnonceCovoit();

  }

}



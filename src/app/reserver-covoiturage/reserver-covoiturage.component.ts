import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { FeatureGeocodeJSON } from '../pub-annonce/geocode-json-response';
import { AdresseService } from '../pub-annonce/adresse.service';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { GetAnnonceCovoitService } from './service/get-annonce-covoit.service';
import { CovoitAnnonce } from '../list-reservation-covoiturages/models/CovoitAnnonce.model';
import { ReserverUnCovoitModalComponent } from './modalComponnent/reserver-un-covoit-modal/reserver-un-covoit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reserver-covoiturage',
  templateUrl: './reserver-covoiturage.component.html',
  styleUrls: ['./reserver-covoiturage.component.scss']
})
export class ReserverCovoiturageComponent implements OnInit, OnDestroy {


  subCovoitAnnonce: Subscription;

  //Detection adresses valides
  adresses: [];
  isLoading = false;

  //list annonce en cours réccupéré du CovoitAnnonceServer
  listAnnoncesCovoit: CovoitAnnonce[] = [];
  //List filtre rempli par la méthode filtreLieuDepartCovoit()
  listFiltreLieuDepart: CovoitAnnonce[] = [];

  //Verifications
  erreurGetAnnoncesCovoit = false;

  lieuDepart: string;


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
    private annoncesCovoit: GetAnnonceCovoitService, private modalService: NgbModal) {

    //Récuperation Adresse Lieu de depart via bakcend
    this.reservationCovoitForm.get('lieuDepart').valueChanges
      .pipe(
        tap(unLieuDepart => this.filtreLieuDepartCovoit(unLieuDepart)),
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

  //récuperation de toutes les annonces en cours grace au services getAnnonceCovoit
  public getAllAnnonceCovoit() {
    this.annoncesCovoit.getAllAnnonceCovoitEnCourse().subscribe(
      annoncesCovoitServer => this.listAnnoncesCovoit = annoncesCovoitServer
        .map(annoncesCovoitServer => new CovoitAnnonce(annoncesCovoitServer)),
      error => this.erreurGetAnnoncesCovoit = true,
    )
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
    if (date2 == date1) {
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
    this.listFiltreLieuDepart = this.listAnnoncesCovoit.filter(annonce => annonce.lieuDepart === unLieuDepart);
  }
  //doit ouvrir modal pour réservation
  reserver(reservationCovoit: ReserverUnCovoitModalComponent) {
    /* l'instantce de NgbModal utilise le methode reserver qui prend en paramettre le composant fenetre modal*/
    const modalRef = this.modalService.open(ReserverUnCovoitModalComponent);
    /*Champ "annonce " (présent en input du composant fenetre modal) est remplis avec l'annonceRecup */
    modalRef.componentInstance.annonce = reservationCovoit;
  }

  ngOnInit(): void {
    this.getAllAnnonceCovoit();

    //tentative de subject
    this.subCovoitAnnonce = this.annoncesCovoit.observableCovoitAnnonceServer.subscribe(
      annoncesCovoitServer => {
      this.listAnnoncesCovoit = annoncesCovoitServer.map(annoncesCovoitServer => new CovoitAnnonce(annoncesCovoitServer));
        this.filtreLieuDepartCovoit(this.lieuDepart)
      },
      error => this.erreurGetAnnoncesCovoit = true,
    );
  }
  ngOnDestroy(): void {
    this.subCovoitAnnonce.unsubscribe();
  }
}



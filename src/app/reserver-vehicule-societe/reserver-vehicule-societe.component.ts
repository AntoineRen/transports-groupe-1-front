import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { GetVehiculeService } from './service/get-vehicule.service';
import { Vechicule } from './domains/vehiculeSociete.domains';
import { Periode } from './domains/periode.domains';
import { PostReservationService } from './service/post-reservation.service';
import { PostReservationServeur } from './domains/postReservationServeur.domains';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserver-vehicule-societe',
  templateUrl: './reserver-vehicule-societe.component.html',
  styleUrls: ['./reserver-vehicule-societe.component.scss']
})
export class ReserverVehiculeSocieteComponent implements OnInit {

  // dateTime
  dateTimeDepart: {
    date: NgbDateStruct;
    time: NgbTimeStruct;
  };

  dateTimeArivee: {
    date: NgbDateStruct;
    time: NgbTimeStruct;
  };

  // timepicker
  hourStep = 1;
  minuteStep = 10;

  // fontawesome
  faCalendarAlt = faCalendarAlt;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  // vehicules
  vehicules: Vechicule[] = [];
  indexVehiculeCourant = 0;
  dispoVehicules: Map<number, boolean> = new Map();

  // verification
  periodeValide = false;
  dateDepartValide = false;
  dateAriveeValide = false;
  erreurGetVehicules = false;
  erreurGetDispo = false;
  erreurReservation = false;

  // modal
  closeResult = '';

  constructor(private vehiculeService: GetVehiculeService,
              private reservationService: PostReservationService,
              private modalService: NgbModal,
              private router: Router) { }

  /** Recuperation de tous les véhicules */
  public getAllVehicule() {
    this.vehiculeService.getAllVehicule().subscribe(
      vehiculesServeur => this.vehicules = vehiculesServeur.map(vehiculeServeur => new Vechicule(vehiculeServeur)),
      error => this.erreurGetVehicules = true,
    );
  }

  /** Recuperation des disponibilités de tous les véhicules */
  public getAllDispo(dTDepart: { date: NgbDateStruct; time: NgbTimeStruct }, dTArivee: { date: NgbDateStruct; time: NgbTimeStruct }) {

    const periode = new Periode(dTDepart, dTArivee);

    this.vehiculeService.getDispoAllVehicules(periode).subscribe(
      disposServeurs => {
        for (const dispo of disposServeurs) {
          this.dispoVehicules.set(dispo.id, dispo.disponibilite);
        }
      },
      error => this.erreurGetDispo = true,
    );
  }

  /** Ajoute la réservation en cours en base de données */
  public postReservation(){
    // creation reservation
     const reservation: PostReservationServeur = new PostReservationServeur(
       new Periode(this.dateTimeDepart, this.dateTimeArivee),
       this.vehicules[this.indexVehiculeCourant].id);

    // sauvegarde reservation
     this.reservationService.postReservation(reservation).subscribe(
        () => this.router.navigate(['/collaborateur/reservations']),
        () => this.erreurReservation = true,
      );
  }

  /** Affichage du véhicule suivant */
  public nextVehicule() {
    if (this.indexVehiculeCourant + 1 >= this.vehicules.length) {
      this.indexVehiculeCourant = 0;
    } else {
      this.indexVehiculeCourant++;
    }
  }

  /** Affichage du véhicule précédent */
  public prevVehicule() {
    if (this.indexVehiculeCourant - 1 < 0) {
      this.indexVehiculeCourant = this.vehicules.length - 1;
    } else {
      this.indexVehiculeCourant--;
    }
  }

  /** Indique si une date/heure est postérieure à la date/heure actuelle */
  private validerDateTime(dateTime: { date: NgbDateStruct; time: NgbTimeStruct }) {

    return dateTime != null
      && new Date() < new Date(dateTime.date.year, dateTime.date.month - 1, dateTime.date.day, dateTime.time.hour, dateTime.time.minute);
  }

  /** Indique si une date/heure de retour est postérieure à une date/heure de départ */
  private apresDateTimeDepart(dTDepart: { date: NgbDateStruct; time: NgbTimeStruct },
                              dTArivee: { date: NgbDateStruct; time: NgbTimeStruct }) {

    return dTDepart != null && dTArivee != null
      && new Date(dTDepart.date.year, dTDepart.date.month - 1, dTDepart.date.day, dTDepart.time.hour, dTDepart.time.minute)
      < new Date(dTArivee.date.year, dTArivee.date.month - 1, dTArivee.date.day, dTArivee.time.hour, dTArivee.time.minute);
  }

  /** Vérifie que la période est valide et lance la rechercher de disponibilité */
  public validerPeriode(dTDepart: { date: NgbDateStruct; time: NgbTimeStruct },
                        dTArivee: { date: NgbDateStruct; time: NgbTimeStruct }) {

    this.dateDepartValide = this.validerDateTime(dTDepart);
    this.dateAriveeValide = this.apresDateTimeDepart(dTDepart, dTArivee);
    this.periodeValide = this.dateDepartValide && this.dateAriveeValide;

    if (this.periodeValide) {
      this.getAllDispo(dTDepart, dTArivee);
    }

  }

  /** Ouvre la fenêtre modale de confirmation */
  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-confirmation' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Gere la fermeture de la fenetre modale si click sur l'arrière plan ou echap */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /** Ajoute un 0 devant un chiffre < 10 */
  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  /** Formate un ngbDateStruct au format dd/mm/yyyy */
  public dateFormatLisible(date: NgbDateStruct) {

    return `${this.step(date.day)}/${this.step(date.month)}/${this.step(date.year)}`;
  }

  /** Formate un ngbTimeStruct au format HHhmm */
  public timeFormatLisible(time: NgbTimeStruct) {

    return `${this.step(time.hour)}h${this.step(time.minute)}`;
  }

  ngOnInit(): void {
    // time picker initialisation
    this.dateTimeDepart = { date: { year: 0, month: 1, day: 1 }, time: { hour: 12, minute: 0, second: 0 } };
    this.dateTimeArivee = { date: { year: 0, month: 1, day: 1 }, time: { hour: 12, minute: 0, second: 0 } };

    this.getAllVehicule();
  }

}

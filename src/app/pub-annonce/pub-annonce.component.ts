import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceService } from './annonce.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AdresseService } from './adresse.service';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { FeatureGeocodeJSON } from './geocode-json-response';
import * as moment from 'moment';

@Component({
  selector: 'app-pub-annonce',
  templateUrl: './pub-annonce.component.html',
  styleUrls: ['./pub-annonce.component.scss']
})
export class PubAnnonceComponent implements OnInit {
  time: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 10;
  dateDepart;
  closeResult = '';
  dateDepartModal;
  adresses: [];
  isLoading = false;
  duree;
  distance;
  minute;
  coordDep = [];
  coordDes = [];

  annoncesForm = new FormGroup({
    lieuDepart: new FormControl('', [Validators.required, this.AdresseVaidator]),
    lieuDestination: new FormControl('', [Validators.required, this.AdresseVaidator]),
    dureeTrajet: new FormControl(),
    distance: new FormControl(),
    immatriculation: new FormControl('', [Validators.required]),
    marque: new FormControl('', [Validators.required]),
    modele: new FormControl('', [Validators.required]),
    nbPlace: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
    dateAnn: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required])
  },
    this.timeDateVaidator
  );

  // tslint:disable-next-line:max-line-length
  constructor(private annonceService: AnnonceService, private adresseService: AdresseService, private modalService: NgbModal) {
    this.search(this.annoncesForm.get('lieuDepart').valueChanges);
    this.search(this.annoncesForm.get('lieuDestination').valueChanges);
  }

  search(value) {

    value.pipe(
      tap(value => { this.coordCalculate(value) },
        () => { this.isLoading = true; }),
      switchMap(value => this.adresseService.search(value)
        .pipe(
          finalize(() => this.isLoading = false),
        ),
      )
    ).subscribe(response => {
      this.adresses = response.features;
    });
  }

  AdresseVaidator(control: AbstractControl) {

    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { incorrect: true };
    }

    return null;
  }

  coordCalculate(selection) {
    if (typeof selection === 'object' && selection != null) {
      if (this.annoncesForm.get('lieuDepart').value === selection) {
        this.coordDep.push(selection.geometry.coordinates[0], selection.geometry.coordinates[1]);
        if (this.coordDep.length > 2) {
          this.coordDep = this.coordDep.splice(2, 4);
        }
      }
      if (this.annoncesForm.get('lieuDestination').value === selection) {
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

  private timeDateVaidator(fg: FormGroup) {
    const date1 = moment(fg.get('dateAnn').value).format('YYYY-MM-DD');
    const date2 = moment().add(1, 'M').format('YYYY-MM-DD');
    const time2 = moment(Date.now()).format('HH:mm');
    const time1 = moment(fg.get('heure').value).format('HH:mm');
    if (date2 === date1 && time2 > time1 && date1) {
      return { 'timeVaidator': true };
    } else if (date1 < date2) {

      return { 'dateVaidator': true };
    }

    return null;
  }

  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  toModelTime(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.step(time.hour)}:${this.step(time.minute)}`;
  }

  toModelDate(date: NgbDateStruct): string {
    if (!date) {
      return null;
    }
    return `${this.step(date.year)}-${this.step(date.month)}-${this.step(date.day)}`;
  }

  creerAnnonce(formAnn) {
    this.annoncesForm.value.lieuDepart = this.adresseFn(this.annoncesForm.value.lieuDepart);
    this.annoncesForm.value.lieuDestination = this.adresseFn(this.annoncesForm.value.lieuDestination);
    this.annoncesForm.value.dateDepart = `${this.toModelDate(this.annoncesForm.get('dateAnn').value)}T${this.toModelTime(this.annoncesForm.get('heure').value)}`;
    const dateArr = moment(this.annoncesForm.value.dateDepart).add(this.duree, 'm').toDate();
    this.annoncesForm.value.dateArrivee = dateArr;
    this.annoncesForm.value.distance = this.distance;
    this.annoncesForm.value.dureeTrajet = this.duree;
    delete this.annoncesForm.value.heure;
    delete this.annoncesForm.value.dateAnn;
    this.annonceService.creerAnnonceCovoiturage(formAnn.value).subscribe(() => {
      formAnn.reset();
      this.distance = '';
      this.duree = '';
    },
      error => {
        console.log('Nok');
      });
  }

  open(content, formAnn) {
    this.dateDepartModal = `${this.toModelDate(this.annoncesForm.get('dateAnn').value)} ${this.toModelTime(this.annoncesForm.get('heure').value)}`;
    this.modalService.open(content).result.then(() => {
      this.creerAnnonce(formAnn);
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


  adresseFn(adresse?: FeatureGeocodeJSON): string | undefined {
    return adresse ? adresse.properties.label : undefined;
  }

  coordFn(coordinates?: FeatureGeocodeJSON): [] | undefined {

    return coordinates ? coordinates.geometry.coordinates : undefined;

  }

  ngOnInit(): void {
  }

}

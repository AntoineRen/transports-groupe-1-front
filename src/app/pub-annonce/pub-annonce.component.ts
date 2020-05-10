import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceService } from './annonce.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AdresseService } from './adresse.service';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { FeatureGeocodeJSON } from './geocode-json-response';
import { formatDate } from '@angular/common';
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

  annoncesForm = new FormGroup({
    lieuDepart: new FormControl('', [Validators.required, this.AdresseVaidator]),
    lieuDestination: new FormControl('', [Validators.required, this.AdresseVaidator]),
    dureeTrajet: new FormControl(),
    distance: new FormControl(),
    immatriculation: new FormControl('', [Validators.required]),
    marque: new FormControl('', [Validators.required]),
    modele: new FormControl('', [Validators.required]),
    nbPlace: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
    dateAnn: new FormControl('', [Validators.required, this.dateVaidator]),
    heure: new FormControl('', [Validators.required, this.timeVaidator])
  });

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private annonceService: AnnonceService, private adresseService: AdresseService, private modalService: NgbModal) {

    this.annoncesForm.get('lieuDepart').valueChanges.pipe(
      tap(() => this.isLoading = true),
      switchMap(value => this.adresseService.search(value)
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    ).subscribe(response => {
      this.adresses = response.features;
    });

    this.annoncesForm.get('lieuDestination').valueChanges.pipe(
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
      return { 'dateAujVaidator': true};
    }else if (date1<date2) {
      return { 'dateVaidator': true};
    }
    return null;
  }

  timeVaidator(control: AbstractControl) {
    const time1 = moment(control.value).format('HH:mm');
    const time2 = moment(Date.now()).format('HH:mm');
    if (time2 > time1) {
      return { 'timeVaidator': true};
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
    this.annoncesForm.value.dureeTrajet = 2;
    this.annoncesForm.value.distance = 3;
    this.annoncesForm.value.responsable_id = 1;
    this.annoncesForm.value.dateArrivee = `${this.toModelDate(this.annoncesForm.get('dateAnn').value)}T${this.toModelTime(this.annoncesForm.get('heure').value)}`;
    this.annoncesForm.value.dateDepart = `${this.toModelDate(this.annoncesForm.get('dateAnn').value)}T${this.toModelTime(this.annoncesForm.get('heure').value)}`;
    delete this.annoncesForm.value.heure;
    delete this.annoncesForm.value.dateAnn;
    this.annonceService.creerAnnonceCovoiturage(formAnn.value).subscribe(() => {
      formAnn.reset();
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

  ngOnInit(): void {
  }


  submitTemplateForm(value) {
    console.log(value);
  }


}

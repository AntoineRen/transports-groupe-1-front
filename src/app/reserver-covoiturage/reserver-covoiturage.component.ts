import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup,AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { FeatureGeocodeJSON } from '../pub-annonce/geocode-json-response';
import { AdresseService } from '../pub-annonce/adresse.service';
import { switchMap, tap, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-reserver-covoiturage',
  templateUrl: './reserver-covoiturage.component.html',
  styleUrls: ['./reserver-covoiturage.component.scss']
})
export class ReserverCovoiturageComponent implements OnInit {


  adresses: [];
  isLoading = false;

  //Construction des champs du reactive Formulaire
  reservationCovoitForm = new FormGroup({
    lieuDepart: new FormControl('', [Validators.required, this.AdresseVaidator]),
    lieuDestination: new FormControl('', [Validators.required, this.AdresseVaidator]),
    dureeTrajet: new FormControl(),
    distance: new FormControl(),
    dateAnn: new FormControl('', [Validators.required, this.dateVaidator]),
  });
    constructor(private adresseService: AdresseService) {
      this.reservationCovoitForm.get('lieuDepart').valueChanges.pipe(
        tap(() => this.isLoading = true),
        switchMap(value => this.adresseService.search(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      ).subscribe(response => {
        this.adresses = response.features;
      });

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

  ngOnInit(): void {
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
      return { dateAujVaidator: true};
    }else if (date1<date2) {
      return { dateVaidator: true};
    }
    return null;
  }

  adresseFn(adresse?: FeatureGeocodeJSON): string | undefined {
    return adresse ? adresse.properties.label : undefined;
  }
  filtreDateCovoit(dateAnn){

  }
}

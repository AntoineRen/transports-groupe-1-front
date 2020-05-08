import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { GetVehiculeService } from './get-vehicule.service';
import { Vechicule } from './vehiculeSociete.domains';

@Component({
  selector: 'app-reserver-vehicule-societe',
  templateUrl: './reserver-vehicule-societe.component.html',
  styleUrls: ['./reserver-vehicule-societe.component.scss']
})
export class ReserverVehiculeSocieteComponent implements OnInit {

  // datepicker
  model: NgbDateStruct;

  // timepicker
  timeDepart: NgbTimeStruct = {hour: 12, minute: 0, second: 0};
  timeRetour: NgbTimeStruct = {hour: 12, minute: 0, second: 0};
  hourStep = 1;
  minuteStep = 10;

  // fontawesome
  faCalendarAlt = faCalendarAlt;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  // vehicules
  vehicules: Vechicule[];
  indexVehiculeCourant = 0;

  constructor(private vehiculeService: GetVehiculeService) { }

  public getAllVehicule(){
    this.vehiculeService.getAllVehicule().subscribe(
      vehiculesServeur => this.vehicules = vehiculesServeur.map( vehiculeServeur => new Vechicule(vehiculeServeur)),
      error => console.log('Oups'), // TODO gestion via alert
    );
  }

  public nextVehicule(){
    if (this.indexVehiculeCourant + 1 >= this.vehicules.length){
      this.indexVehiculeCourant = 0;
    } else {
      this.indexVehiculeCourant ++;
    }
  }

  public prevVehicule(){
    if (this.indexVehiculeCourant - 1 < 0){
      this.indexVehiculeCourant = this.vehicules.length - 1;
    } else {
      this.indexVehiculeCourant --;
    }
  }

  ngOnInit(): void {
    this.getAllVehicule();
  }

}

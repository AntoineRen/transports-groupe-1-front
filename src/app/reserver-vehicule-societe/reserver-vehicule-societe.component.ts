import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reserver-vehicule-societe',
  templateUrl: './reserver-vehicule-societe.component.html',
  styleUrls: ['./reserver-vehicule-societe.component.scss']
})
export class ReserverVehiculeSocieteComponent implements OnInit {

  // datepicker
  model: NgbDateStruct;

  // timepicker
  time = {hour: 12, minute: 10};
  hourStep = 1;
  minuteStep = 10;

  // fontawesome
  faCalendarAlt = faCalendarAlt;

  constructor() { }

  ngOnInit(): void {
  }

}

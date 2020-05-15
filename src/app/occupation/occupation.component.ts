import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {

  // date picker
  dateDebut: Date;
  dateFin: Date;

  // fontawesome
  faCalendarAlt = faCalendarAlt;


  constructor() { }

  validerPeriode(dateDebut, dateFin){

  }

  ngOnInit(): void {
  }

}

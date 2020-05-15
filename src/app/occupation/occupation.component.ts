import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { OccupationChauffeurService } from './service/occupation-chauffeur.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {

  // date picker
  dateDebut: NgbDateStruct;
  dateFin: NgbDateStruct;

  // fontawesome
  faCalendarAlt = faCalendarAlt;

  // apexchart
  options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    stroke: {
      curve: 'smooth',
    }
  };

  constructor(private serviceOccupationChauffeur: OccupationChauffeurService) { }

  public getReservationsPeriode(dateDebut: NgbDateStruct, dateFin: NgbDateStruct){

    console.log(dateDebut);

    this.serviceOccupationChauffeur.getReservationsPeriode(dateDebut, dateFin).subscribe(
      (reservations) => console.log(reservations),
      () => console.log('erreur'),
    );
  }

  validerPeriode(dateDebut, dateFin){
    //TODO
  }




  ngOnInit(): void {
  }

}

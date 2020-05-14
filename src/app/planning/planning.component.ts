import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ReservationChauffeurService } from './service/reservation-chauffeur.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {


  // Calendar
  viewDate = new Date();
  start = new Date();
  end = new Date();
  refresh: Subject<any> = new Subject();

  // font awesome
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  events: CalendarEvent[] = [];

  constructor(private serviceReservationChauffeur: ReservationChauffeurService) { }

  public step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  public jourSuivant() {
    this.viewDate.setDate(this.viewDate.getDate() + 1);
    this.refresh.next();
  }

  public jourPrecedent() {
    this.viewDate.setDate(this.viewDate.getDate() - 1);
    this.refresh.next();
  }

  ngOnInit(): void {

    this.serviceReservationChauffeur.getReservationChauffeur().subscribe(
      (reservationsEvents => this.events = this.events.concat(reservationsEvents)),
      ( () => console.log('erreur')),
    );

    this.serviceReservationChauffeur.getReservationEnAttente().subscribe(
      (reservationsEvents => this.events = this.events.concat(reservationsEvents)),
      ( () => console.log('erreur')),
    );
  }

}

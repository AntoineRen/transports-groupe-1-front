import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ReservationChauffeurService } from './service/reservation-chauffeur.service';

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

  /** Update une réservation en attente de chauffeur, update son statut à avec_chauffeur et lui ajoute le chauffeur courant */
  public updateReservation(eventAccepte: CalendarEvent){

    this.serviceReservationChauffeur.AcceptReservation(eventAccepte.meta.id).subscribe(
      ((eventModifie) => {
        let i = 0;
        while (i < this.events.length){
          if (this.events[i].meta.id === eventModifie.meta.id){
            this.events[i] = eventModifie;
            i = this.events.length;
          }
          i++;
        }
        this.refresh.next();
      }),
      () => console.log('erreur'),
    );
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

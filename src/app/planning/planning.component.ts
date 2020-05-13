import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

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
  @Input()
  eventTitleTemplate: TemplateRef<any>;

  @Input()
  eventActionsTemplate: TemplateRef<any>;

  // font awesome
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  events: CalendarEvent[] = [
    {
    start: new Date('2020-05-13T12:33:32.622Z'),
    end: new Date('2020-05-13T14:33:32.622Z'),
    title: 'A draggable and resizable event',
    color: colors.yellow,
    resizable: {
      beforeStart: false,
      afterEnd: false,
    },
    draggable: false,
  },
  {
    start: new Date('2020-05-13T13:33:32.622Z'),
    end: new Date('2020-05-13T14:33:32.622Z'),
    title: 'A draggable and resizable event',
    color: colors.red,
    resizable: {
      beforeStart: false,
      afterEnd: false,
    },
    draggable: false,
  },
  {
    start: new Date('2020-05-14T13:33:32.622Z'),
    end: new Date('2020-05-15T14:33:32.622Z'),
    title: 'A draggable and resizable event',
    color: colors.red,
    resizable: {
      beforeStart: false,
      afterEnd: false,
    },
    draggable: false,
  },
  ];

  constructor() { }

  public step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  public jourSuivant(){
    this.viewDate.setDate(this.viewDate.getDate() + 1);
    this.refresh.next();
  }

  public jourPrecedent(){
    this.viewDate.setDate(this.viewDate.getDate() - 1);
    this.refresh.next();
  }

  ngOnInit(): void {
  }

}

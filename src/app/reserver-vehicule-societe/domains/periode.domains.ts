import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

/** Classe permettant de formatter une date/heure de départ et une date/heure de retour dans un format lisible par le serveur */
export class Periode{

  dateDepart: string;
  dateRetour: string;

  constructor(dateDepart: {date: NgbDateStruct; time: NgbTimeStruct}, dateRetour: {date: NgbDateStruct; time: NgbTimeStruct}){

    this.dateDepart = this.formatDateTime(dateDepart.date, dateDepart.time);
    this.dateRetour = this.formatDateTime(dateRetour.date, dateRetour.time);
  }

  /** Ajoute un 0 devant un chiffre < 10 */
  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  /** Formate une date/heure en format UTC */
  private formatDateTime(date: NgbDateStruct, time: NgbTimeStruct){

    return `${this.step(date.year)}-${this.step(date.month)}-${this.step(date.day)}T${this.step(time.hour)}:${this.step(time.minute)}`;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationServeur } from '../domains/reservationServeur.domains';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const URL_BACKEND = environment.baseUrl + 'reservation/';

@Injectable({
  providedIn: 'root'
})
export class OccupationChauffeurService {

  // Map jour/seconde occupé
  mapOccupation: Map<string, number> = new Map();

  // Map jour/taux
  mapTauxOccupation: Map<string, number> = new Map();

  constructor(private http: HttpClient) { }

  public getReservationsPeriode(dateDebut: NgbDateStruct, dateFin: NgbDateStruct): Observable<ReservationServeur[]>{

    return this.http.get<ReservationServeur[]>(`${URL_BACKEND}?debut=${this.formatDate(dateDebut)}&fin=${this.formatDate(dateFin)}`);
  }

  private fillMapOccupation(debut: Date, fin: Date){

    if (debut.getDate === fin.getDate){ // si reservation un seul jour

      if (this.mapOccupation.has(debut.toDateString())){ // si un jour déja présent
       // this.mapOccupation.set
      }
     // this.mapOccupation.set()

    } else { // si reservation plusieurs jours

    }

  }

  private fillMapTauxOccupation(){

    // parcours de chaque éléments de la map et on divise le nombre de secondes par 86 400

  }

  private moyenneOccupation(): number {

    // somme de tous les taux de la map et division par map.length

    return 0;
  }

  /** Ajoute un 0 devant un chiffre < 10 */
  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  /** Formate une date au format UTC */
  private formatDate(date: NgbDateStruct): string{

    return `${this.step(date.year)}-${this.step(date.month)}-${this.step(date.day)}`;
  }
}

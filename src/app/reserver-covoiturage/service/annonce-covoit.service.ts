import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import CovoitAnnonceServer from 'src/app/list-reservation-covoiturages/models/CovoitAnnonceServer.model';
import { environment } from 'src/environments/environment';
import { CovoitAnnonce } from 'src/app/list-reservation-covoiturages/models/CovoitAnnonce.model';
import { tap } from 'rxjs/operators';
import { Annonce } from 'src/app/pub-annonce/annonce';


const URL_BACKEND = environment.baseUrl + 'annonce/';

/** Service permettant de faire la liason avec le serveur sur les demandes concernant les annonce de covoiturage */
@Injectable({
  providedIn: 'root'
})
export class AnnonceCovoitService {

  //private subjectCovoitAnnonceServer = new BehaviorSubject<CovoitAnnonceServer[]>(null);


  constructor(private http: HttpClient) { }

  /** Recupère tout les annonces du serveur */
  public getAllAnnonceCovoitEnCourse(): Observable<Annonce[]> {

    return this.http.get<Annonce[]>(`${URL_BACKEND}listAnnonceEnCours`)
      //.pipe(tap(annonces => this.subjectCovoitAnnonceServer.next(annonces)));
  }

  //get observableCovoitAnnonceServer() : Observable<CovoitAnnonceServer[]>{
    //return this.subjectCovoitAnnonceServer.asObservable();}
  public putReservation(idAnnonce: number) {
    return this.http.put(`${URL_BACKEND}reservationCovoit`, idAnnonce);
  }
}

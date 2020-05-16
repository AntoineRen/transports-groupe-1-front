import { Injectable } from '@angular/core';
import CovoitAnnonceServer from './models/CovoitAnnonceServer.model';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Annonce } from '../pub-annonce/annonce';


const URL_BACKEND = environment.baseUrl + 'annonce/';
@Injectable({
  providedIn: 'root'
})
export class ListCovoiturageService {


  private listCovoit = new Map();
  private transfertAnnonces = new Subject<CovoitAnnonceServer[]>();

  constructor(private http: HttpClient) { }


  recupererListAnnonceCovoitEncours(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${URL_BACKEND}self/reservations?encours=true`);
  }
  recupererListAnnonceCovoitHistorique(): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${URL_BACKEND}self/reservations?encours=false`);
  }

  annulerReservation(id): Observable<Annonce>{
    return this.http.put<Annonce>(`${URL_BACKEND}self/reservation/annulation`, id);
  }

}

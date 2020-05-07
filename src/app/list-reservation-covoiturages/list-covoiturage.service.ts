import { Injectable } from '@angular/core';
import CovoitAnnonceServer from './models/CovoitAnnonceServer.model';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCovoiturageService {


  private listCovoit = new Map();
  private transfertAnnonces = new Subject<CovoitAnnonceServer[]>();

  constructor(private http: HttpClient) { }


  recupererListAnnonceCovoitEncours(): Observable<CovoitAnnonceServer[]> {
    return this.http.get<CovoitAnnonceServer[]>('http://localhost:8080/annonce/listAnnonceEnCours');
  }
  recupererListAnnonceCovoitHistorique(): Observable<CovoitAnnonceServer[]>{
    return this.http.get<CovoitAnnonceServer[]>('http://localhost:8080/annonce/listAnnonceHistorique');
  }
  /*  getLalistAnnonce(): Observable<CovoitAnnonceServer[]> {
      return this.transfertAnnonces.asObservable();
  }*/
}

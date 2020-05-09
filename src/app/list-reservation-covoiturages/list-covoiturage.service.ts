import { Injectable } from '@angular/core';
import CovoitAnnonceServer from './models/CovoitAnnonceServer.model';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL_BACKEND = environment.baseUrl + 'annonce/';
@Injectable({
  providedIn: 'root'
})
export class ListCovoiturageService {


  private listCovoit = new Map();
  private transfertAnnonces = new Subject<CovoitAnnonceServer[]>();

  constructor(private http: HttpClient) { }


  recupererListAnnonceCovoitEncours(): Observable<CovoitAnnonceServer[]> {
    return this.http.get<CovoitAnnonceServer[]>(`${URL_BACKEND}listAnnonceEnCours`);
  }
  recupererListAnnonceCovoitHistorique(): Observable<CovoitAnnonceServer[]>{
    return this.http.get<CovoitAnnonceServer[]>(`${URL_BACKEND}listAnnonceHistorique`);
  }
  /*  getLalistAnnonce(): Observable<CovoitAnnonceServer[]> {
      return this.transfertAnnonces.asObservable();
  }*/
}

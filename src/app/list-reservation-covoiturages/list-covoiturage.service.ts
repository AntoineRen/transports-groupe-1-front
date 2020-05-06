import { Injectable } from '@angular/core';
import CovoitAnnonce from '../list-reservation-covoiturages/covoitAnnonce.model';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCovoiturageService {


  private listCovoit = new Map();
  private transfertAnnonces = new Subject<CovoitAnnonce[]>();

  constructor(private http: HttpClient) { }


  recupererListAnnonceCovoit(emailCollegue: string): Observable<CovoitAnnonce[]> {
    return this.http.get<CovoitAnnonce[]>('http://localhost:8080/annonce/listAnnonce');
  }
  getLalistAnnonce(): Observable<CovoitAnnonce[]> {
    return this.transfertAnnonces.asObservable();
  }
}

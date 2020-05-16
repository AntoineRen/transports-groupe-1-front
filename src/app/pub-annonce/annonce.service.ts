import { Injectable } from '@angular/core';
import { Annonce } from './annonce';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'annonce/';
@Injectable({
  providedIn: 'root'
})
export class AnnonceService {


  constructor(private http: HttpClient) { }

  creerAnnonceCovoiturage(ann: Annonce): Observable<void> {
    return this.http.post<void>(URL_BACKEND, ann);
  }

  recupererListAnnonceEncours(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${URL_BACKEND}self/annonces?encours=true`);
  }

  recupererListAnnonceHistorique(): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${URL_BACKEND}self/annonces?encours=false`);
  }

  annulerAnnonce(id): Observable<Annonce>{
    return this.http.put<Annonce>(`${URL_BACKEND}annuler`, id);
  }

}

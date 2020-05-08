import { Injectable } from '@angular/core';
import { Annonce } from './annonce';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnnonceService {


  constructor(private httpClient: HttpClient) { }

  creerAnnonceCovoiturage(ann: Annonce): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:8080/annonce`, ann);
  }

}

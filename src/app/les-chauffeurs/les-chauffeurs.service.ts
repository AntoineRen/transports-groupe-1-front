import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Chauffeur } from './chauffeur';

const URL_BACKEND = environment.baseUrl + 'collegue';

@Injectable({
  providedIn: 'root'
})
export class LesChauffeursService {



  constructor(private httpClient: HttpClient) { }

  creerChauffeur(email): Observable<Chauffeur> {
    return this.httpClient.put<Chauffeur>(URL_BACKEND + '/ajouterChauffeur', email);
  }

  getAllChauffeur(): Observable<Chauffeur[]> {
    return this.httpClient.get<Chauffeur[]>(URL_BACKEND + '/allChauffeurs');
  }
}

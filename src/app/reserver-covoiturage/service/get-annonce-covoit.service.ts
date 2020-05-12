import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CovoitAnnonceServer from 'src/app/list-reservation-covoiturages/models/CovoitAnnonceServer.model';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'annonce/';

/** Service permettant de faire la liason avec le serveur sur les demandes concernant les annonce de covoiturage */
@Injectable({
  providedIn: 'root'
})
export class GetAnnonceCovoitService {

  constructor(private http: HttpClient) { }

  /** Recupère tout les véhicules de sociétés du serveur */
  public getAllAnnonceCoitEnCourse(): Observable<CovoitAnnonceServer[]>{
    return this.http.get<CovoitAnnonceServer[]>(`${URL_BACKEND}listAllAnnonce`);
  }
}

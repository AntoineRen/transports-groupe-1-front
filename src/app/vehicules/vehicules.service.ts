import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { VehiculeServeur } from './vehiculeServeur.domains';
import { Observable, throwError } from 'rxjs';
import { Vehicule } from './vehicule';
import { catchError } from 'rxjs/operators';

const URL_BACKEND = environment.baseUrl + 'vehicule/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {
    
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //erreur coté client
      console.error('An error occurred:', error.error.message);
    } else {
      //erreur coté back
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //retourne lerreur rencontré
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  constructor(private http: HttpClient) { }

  requestGetVehicules(): Observable<VehiculeServeur[]>{
    return this.http.get<VehiculeServeur[]>(URL_BACKEND);
  }
  requestPostVehicule(immatriculation:string,marque:string, modele:string, categorie:string, nbPlace:number, photoUrl:string){
    return this.http.post(
      URL_BACKEND,
      {
        immatriculation,
        marque,
        modele,
        categorie,
        nbPlace,
        photoUrl
      },httpOptions);
  }
}

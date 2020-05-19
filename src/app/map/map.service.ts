import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiculeServeur } from './vehiculeServeur';
import { delay } from 'rxjs/operators';

const URL_BACKEND = environment.baseUrl + 'vehicule/simulation';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }

  simulation(): Observable<VehiculeServeur[]> {
    return this.httpClient.get<VehiculeServeur[]>(URL_BACKEND);
  }

}

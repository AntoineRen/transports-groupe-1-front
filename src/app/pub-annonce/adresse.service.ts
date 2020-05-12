import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GeocodeJSON } from './geocode-json-response';


@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private httpClient: HttpClient) { }

  search(value: any): Observable<any> {
    if (typeof value === 'string' && value.length >= 3) {
      return this.httpClient.get<GeocodeJSON>(`https://api-adresse.data.gouv.fr/search/?q=${value}&type=housenumber&autocomplete=1`);
    } else {
      return of([]);
    }
  }

}

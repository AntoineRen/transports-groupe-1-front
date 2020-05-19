import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistiques } from '../domains/statistiques.domains';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(private http: HttpClient) { }

  public getStatitisquesCovoiturages(): Observable<Statistiques>{
    return this.http.get<Statistiques>(`${URL_BACKEND}annonce/self/statistiques`);
  }

  public getStatitisquesLocations(): Observable<Statistiques>{
    return this.http.get<Statistiques>(`${URL_BACKEND}reservation/self/statistiques`);
  }
}

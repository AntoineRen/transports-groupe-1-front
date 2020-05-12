import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListReservationCovoituragesComponent } from './list-reservation-covoiturages/list-reservation-covoiturages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { PubAnnonceComponent } from './pub-annonce/pub-annonce.component';
import { RecapResaVehiculeSocieteComponent } from './recap-resa-vehicule-societe/recap-resa-vehicule-societe.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { CovoitAnnonceResume } from './list-reservation-covoiturages/modalComponnent/CovoitAnnonceResume.modal-component';
import { VosReservationsComponent } from './vos-reservations/vos-reservations.component';
import { ReserverCovoiturageComponent } from './reserver-covoiturage/reserver-covoiturage.component';
import { ReserverUnVehiculeComponent } from './reserver-un-vehicule/reserver-un-vehicule.component';
import { ReserverVehiculeSocieteComponent } from './reserver-vehicule-societe/reserver-vehicule-societe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdresseService } from './pub-annonce/adresse.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    ListReservationCovoituragesComponent,
    CovoitAnnonceResume,
    MenuComponent,
    PubAnnonceComponent,
    RecapResaVehiculeSocieteComponent,
    ChauffeurComponent,
    CollaborateurComponent,
    AdministrateurComponent,
    VosReservationsComponent,
    ReserverCovoiturageComponent,
    ReserverUnVehiculeComponent,
    ReserverVehiculeSocieteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS ,
    useClass: AuthInterceptorService,
    multi: true
  },AdresseService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

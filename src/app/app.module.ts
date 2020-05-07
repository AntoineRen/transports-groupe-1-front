import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ListReservationCovoituragesComponent } from './list-reservation-covoiturages/list-reservation-covoiturages.component';
import { RecapResaVehiculeSocieteComponent } from './recap-resa-vehicule-societe/recap-resa-vehicule-societe.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CovoitAnnonceResume } from './list-reservation-covoiturages/modalComponnent/CovoitAnnonceResume.modal-component';
import { VosReservationsComponent } from './vos-reservations/vos-reservations.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    ListReservationCovoituragesComponent,
    CovoitAnnonceResume,
    MenuComponent,
    RecapResaVehiculeSocieteComponent,
    ChauffeurComponent,
    CollaborateurComponent,
    AdministrateurComponent,
    VosReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

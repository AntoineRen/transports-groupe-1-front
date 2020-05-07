import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {RouterModule, Routes} from '@angular/router';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ListReservationCovoituragesComponent } from './list-reservation-covoiturages/list-reservation-covoiturages.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CovoitAnnonceResume } from './list-reservation-covoiturages/modalComponnent/CovoitAnnonceResume.modal-component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    ListReservationCovoituragesComponent,
    ChauffeurComponent,
    CollaborateurComponent,
    AdministrateurComponent,
    CovoitAnnonceResume,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { PubAnnonceComponent } from './pub-annonce/pub-annonce.component';
import { RecapResaVehiculeSocieteComponent } from './recap-resa-vehicule-societe/recap-resa-vehicule-societe.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { VosReservationsComponent } from './vos-reservations/vos-reservations.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    MenuComponent,
    PubAnnonceComponent,
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
    CommonModule,
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

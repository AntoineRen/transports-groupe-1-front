import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import{StatutAdminService} from './auth/status-admin.service';
import { StatutChauffeurService } from './auth/status-chauffeur.service';

const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'connexion', component: AuthComponent},
  { path: '', redirectTo: '/collaborateur', pathMatch: 'full'},
  { path: 'collaborateur',component:CollaborateurComponent,canActivate: [StatutConnecteService]}, //route collaborateur seulement si connecté
  { path: 'chauffeur',component:ChauffeurComponent,canActivate: [StatutConnecteService,StatutChauffeurService]}, //chauffeur et admin, seulement si connecté
  { path: 'administrateur',component:AdministrateurComponent,canActivate: [StatutConnecteService,StatutAdminService]} //administrateur collaborateur seulement si connecté
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

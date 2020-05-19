import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Statistiques } from './domains/statistiques.domains';
import { StatistiquesService } from './service/statistiques.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  col: Collegue;
  subCollegueConnecte: Subscription;
  error = false;

  // Statistiques
  statistiquesCovoiturages: Statistiques;
  statistiquesLocations: Statistiques;

  // erreur
  erreurStatistiques = false;

  constructor(private authService: AuthService, private statistiquesService: StatistiquesService) { }

  public rolesToString(): string{

    let res = '';

    for (const role of this.col.roles){

      switch (role) {
        case 'ROLE_COLLABORATEUR': {
           res += ', Collaborateur';
           break;
        }
        case 'ROLE_CHAUFFEUR': {
          res += ', Chauffeur';
          break;
       }
       case 'ROLE_ADMINISTRATEUR': {
        res += ', Administrateur';
        break;
     }
     }
    }

    return res.slice(1, res.length);

  }


  ngOnInit(): void {
    this.subCollegueConnecte = this.authService.collegueConnecteObs.subscribe(
      collegue => this.col = collegue,
      () => this.error = true
    );

    this.statistiquesService.getStatitisquesCovoiturages().subscribe(
      stats => this.statistiquesCovoiturages = stats,
      () => this.erreurStatistiques = true,
    );

    this.statistiquesService.getStatitisquesLocations().subscribe(
      stats => this.statistiquesLocations = stats,
      () => this.erreurStatistiques = true,
    );
  }

  ngOnDestroy(): void {
    this.subCollegueConnecte.unsubscribe();
  }

}

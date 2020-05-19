import { Component, OnInit } from '@angular/core';
import { Collegue } from './auth.domains';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { keyframes, style } from '@angular/animations';

/**
 * Formulaire d'authentification.
 */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.components.scss']
})

export class AuthComponent implements OnInit {

  iconeConnected = faRoad;

  collegue: Collegue = new Collegue({});
  err: boolean;

  constructor(private authSrv: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  connecter() {

    this.authSrv.connecter(this.collegue.email, this.collegue.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page collaborateur,chauffeur ou administrateur en fonction du rôle

        col => {
          let redirectionUser: string = '';
          for (let roleindex in col.roles) {
            if (col.roles[roleindex] == 'ROLE_ADMINISTRATEUR') {
              redirectionUser = '/admin';
            }

            else if (col.roles[roleindex] == 'ROLE_CHAUFFEUR' && redirectionUser == '' || col.roles[roleindex] == 'ROLE_CHAUFFEUR' && redirectionUser == '/collaborateur') {
              redirectionUser = '/chauffeur';
            }

            else if (col.roles[roleindex] == 'ROLE_COLLABORATEUR' && redirectionUser == '') {
              redirectionUser = '/collaborateur';
            }
          }
          this.toastr.success('Connexion réussie.', 'Authentification');
          this.router.navigate([redirectionUser])
        },
        // en cas d'erreur, affichage d'un message d'erreur
        err => {this.err = true,
                this.toastr.error('Connexion échouée.', 'Authentification');}
      );
  }
}

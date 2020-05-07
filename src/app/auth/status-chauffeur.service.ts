import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, tap} from 'rxjs/operators';

/**
 * Service utilisé par le routeur pour savoir si l'utilisateur est connecté.
 *
 * En cas d'utilisateur non connecté, il est redirigé vers la page de connexion.
 */
@Injectable({
  providedIn: 'root'
})
export class StatutChauffeurService implements CanActivate{

  constructor(private _authSrv: AuthService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authSrv.verifierAuthentification()
      .pipe(
        map(col => {
          for(const role of col.roles){
            if(role.match('ROLE_CHAUFFEUR'))
            {
              return true;
            }
          }
          return false;
        }),
        tap(estAdmin => {
          if (!estAdmin) {
            this._router.navigate(['/collaborateur']);
          }
        })
      );
  }

}

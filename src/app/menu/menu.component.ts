import { Component, OnInit } from '@angular/core';
import {Collegue} from '../auth/auth.domains';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  iconeDisconnected = faTimes;

  constructor(private authSrv: AuthService, private router: Router) { }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/connexion'])
    );
  }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
  }

}

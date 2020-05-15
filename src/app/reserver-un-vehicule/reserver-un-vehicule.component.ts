import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reserver-un-vehicule',
  templateUrl: './reserver-un-vehicule.component.html',
  styleUrls: ['./reserver-un-vehicule.component.scss']
})
export class ReserverUnVehiculeComponent implements OnInit, OnDestroy {

  col: Collegue;
  subCollegueConnecte: Subscription;
  error = false;
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.subCollegueConnecte = this.authService.collegueConnecteObs.subscribe(
      collegue => this.col = collegue,
      () => this.error = true
    );
  }

  ngOnDestroy(): void {
    this.subCollegueConnecte.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-vos-reservations',
  templateUrl: './vos-reservations.component.html',
  styleUrls: ['./vos-reservations.component.scss']
})
export class VosReservationsComponent implements OnInit, OnDestroy {

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

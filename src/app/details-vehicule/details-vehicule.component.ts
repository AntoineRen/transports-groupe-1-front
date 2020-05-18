import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicule } from '../vehicules/vehicule';
import { DetailsVehiculeService } from './details-vehicule.service';
import { ReservationVehicule, ReservationVehiculeServeur } from './details-vehicule.model';


@Component({
  selector: 'app-details-vehicule',
  templateUrl: './details-vehicule.component.html',
  styleUrls: ['./details-vehicule.component.scss']
})
export class DetailsVehiculeComponent implements OnInit {

  // attribut pour vehicule
  immatriculation: string;
  vehicule: Vehicule;
  erreurGetVehicule: boolean = false;

  //Attributs pour liste des procahaines reservations

  listProchainesReservations: ReservationVehicule[];
  isErreurProchainesReservations: boolean = false;
  erreurProchainesReservations: string;

 //Attributs pour liste historique reservation

  listHistoriqueReservations: ReservationVehicule[];
  isErreurHistoriqueReservations: boolean = false;
  erreurHistoriqueReservations: string;

  constructor(private route: ActivatedRoute, private router: Router, private detailsVehiculeService: DetailsVehiculeService) { }

  subDetailsVehiculeService(): void {
    this.detailsVehiculeService.getvehiculeByImmatriculation(this.immatriculation)
      .subscribe((vehiculeServer) => { this.vehicule = vehiculeServer; }, error => this.erreurGetVehicule = true);
  }
  subProchainesReservationsByVehicule(): void {
    this.detailsVehiculeService.getProchainesReservationsByVehicule(this.immatriculation)
      .subscribe(listResaServer => {
        this.listProchainesReservations = listResaServer
          .map(reservation => new ReservationVehicule(reservation));
      }, err => {
        this.isErreurProchainesReservations = true;
      });
  }

  subHistoriqueReservationsByVehicule(): void {
    this.detailsVehiculeService.getHistoriqueReservationsByVehicule(this.immatriculation)
      .subscribe(listResaServer => {
        this.listHistoriqueReservations = listResaServer
          .map(reservation => new ReservationVehicule(reservation));
      }, err => {
        this.isErreurProchainesReservations = true;
      });
  }


  ngOnInit(): void {
    this.immatriculation = this.route.snapshot.params['immatriculation'];
    this.subDetailsVehiculeService();
    this.subProchainesReservationsByVehicule();
    this.subHistoriqueReservationsByVehicule();

  }

}

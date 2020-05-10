import { Component, OnInit } from '@angular/core';
import { Vehicule } from './vehicule';
import { VehiculesService } from './vehicules.service';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent implements OnInit {

  vehicules:Vehicule[];
  // erreur
  erreurVehicules=false;

  constructor(private vehiculesService : VehiculesService) { }

  ngOnInit(): void {
    this.vehiculesService.requestGetVehicules()
    .subscribe(listeVehicule =>{
      this.vehicules = listeVehicule
      .map(leVehicule=>new Vehicule(leVehicule));
    },error=>this.erreurVehicules=true,
    );
    console.log(this.vehicules);
  }
}

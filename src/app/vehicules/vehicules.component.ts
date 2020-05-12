import { Component, OnInit } from '@angular/core';
import { Vehicule } from './vehicule';
import { VehiculesService } from './vehicules.service';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent implements OnInit {

  vehicules:Vehicule[];
  filterVehicule:Vehicule[];
  // erreur
  erreurVehicules=false;
  profileFormControleVehicule = new FormGroup({
    ReactiveFormControleVehiculeImat : new FormControl(''),
    ReactiveFormControleVehiculeModel : new FormControl('')
  });
  constructor(private vehiculesService : VehiculesService) {
    this.profileFormControleVehicule.get('ReactiveFormControleVehiculeImat').valueChanges.pipe(
      map( 
        immatriculation => 
          this.FilterVehiculeFunctionimmat(immatriculation)
      )
    )
    .subscribe(object => this.filterVehicule = object.slice());

    this.profileFormControleVehicule.get('ReactiveFormControleVehiculeModel').valueChanges.pipe(
      map( 
        immatriculation => 
          this.FilterVehiculeFunctionMarque(immatriculation)
      )
    )
    .subscribe(object => this.filterVehicule = object.slice());
   }

  ngOnInit(): void {
    this.vehiculesService.requestGetVehicules()
    .subscribe(listeVehicule =>{
      this.vehicules = listeVehicule
      .map(leVehicule=>new Vehicule(leVehicule));

      this.filterVehicule = this.vehicules.slice();

    },error=>this.erreurVehicules=true,
    );
  }

  FilterVehiculeFunctionimmat(immatriculation:string):Vehicule[]{
    return this.vehicules.filter( vehicule=> vehicule.immatriculation.includes(immatriculation.toLocaleUpperCase()))
  }
  FilterVehiculeFunctionMarque(marque:string):Vehicule[]{
    return this.vehicules.filter( vehicule=> vehicule.marque.includes(marque.toLocaleUpperCase()))
  }
}

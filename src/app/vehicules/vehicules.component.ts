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
    this.profileFormControleVehicule.valueChanges.pipe(
      map( ()=>{
        let filterVehiculeTemp:Vehicule[];
          filterVehiculeTemp = this.FilterVehiculeFunctionimmat(
            this.profileFormControleVehicule.get('ReactiveFormControleVehiculeImat').value,
            this.profileFormControleVehicule.get('ReactiveFormControleVehiculeModel').value);
        return filterVehiculeTemp;
      })
    ).subscribe(object => this.filterVehicule = object);
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
  
  FilterVehiculeFunctionimmat(immatriculation:string, marque:string):Vehicule[]{
    let tempFilterArray:Vehicule[];
    tempFilterArray = this.vehicules.filter( vehicule=> vehicule.immatriculation.toUpperCase().includes(immatriculation.toLocaleUpperCase()))
    console.log("immat");
    console.log(tempFilterArray);
    tempFilterArray = tempFilterArray.filter( vehicule=> vehicule.marque.toLocaleLowerCase().includes(marque.toLocaleLowerCase()));
    console.log("marque");
    console.log(tempFilterArray);
    return tempFilterArray;
  }
}

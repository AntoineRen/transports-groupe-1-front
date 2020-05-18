import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Vehicule } from './vehicule';
import { VehiculesService } from './vehicules.service';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Categorie } from './vehiculeCategorie';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})

export class VehiculesComponent implements OnInit {
  @Output() valider = new EventEmitter<void>();

  vehicules:Vehicule[];
  filterVehicule:Vehicule[];

  immatriculation:string;
  marque:string;
  modele:string;
  categorielist=Categorie;
  catChoose:string;
  nbPlace:number;
  photoUrl:string;
  // erreur
  erreurVehicules=false;
  profileFormControleVehicule = new FormGroup({
    ReactiveFormControleVehiculeImat : new FormControl(''),
    ReactiveFormControleVehiculeModel : new FormControl('')
  });
  constructor(private vehiculesService : VehiculesService , private modalService: NgbModal, private toastr: ToastrService) {
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
    tempFilterArray = tempFilterArray.filter( vehicule=> vehicule.marque.toLocaleLowerCase().includes(marque.toLocaleLowerCase()));
    return tempFilterArray;
  }
  AjoutVehicule(){
    this.vehiculesService.requestPostVehicule(this.immatriculation.toLocaleUpperCase(), this.marque.toLocaleUpperCase(), this.modele.toLocaleLowerCase(), this.catChoose, this.nbPlace, this.photoUrl)
    .subscribe( ()=>{
      this.valider.emit();
      this.toastr.success('Votre véhicule a été créée avec succès', 'Véhicule');
    },(error:HttpErrorResponse)=>{
      this.toastr.error("une erreur s'est produite lors de la création d'une véhicule ", 'Véhicule');
      console.log(error);
    });
  }

}

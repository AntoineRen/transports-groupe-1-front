import { VehiculeServeur } from './vehiculeServeur.domains';


export class Vehicule {

  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  categorie: string;
  nbPlace:number;
  statut: string;
  photoUrl: string;

  constructor(leVehicule:VehiculeServeur){
      this.id = leVehicule.id;
      this.immatriculation = leVehicule.immatriculation;
      this.marque = leVehicule.marque;
      this.modele = leVehicule.modele;
      this.categorie = leVehicule.categorie;
      this.statut = leVehicule.statut;
      this.nbPlace = leVehicule.nbPlace;
      this.photoUrl = leVehicule.photoUrl
  }

}

import { VehiculeServeur } from './vehiculeServeur.domains';

/**
 *  Objet véhicule utilisable dans l'application et construit a partir d'un VehiculeServeur
 */
export class  Vechicule {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  categorie: string;
  statut: string;
  photoUrl: string;

  constructor( vehiculeServeur: VehiculeServeur) {
    this.id = vehiculeServeur.id;
    this.immatriculation = vehiculeServeur.immatriculation;
    this.marque = vehiculeServeur.marque;
    this.modele = vehiculeServeur.modele;
    this.categorie = vehiculeServeur.categorie;
    this.statut = vehiculeServeur.statut;
    this.photoUrl = vehiculeServeur.photoUrl;
  }

}

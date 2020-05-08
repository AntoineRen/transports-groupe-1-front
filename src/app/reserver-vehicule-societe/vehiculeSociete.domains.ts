import { VehiculeServeur } from './vehiculeServeur.domains';

/**
 *  Vechicule.
 */
export class  Vechicule {
  immatriculation: string;
  marque: string;
  modele: string;
  categorie: string;
  disponibilite?: boolean;
  statut: string;
  photoUrl: string;

  constructor( vehiculeServeur: VehiculeServeur) {
    this.immatriculation = vehiculeServeur.immatriculation;
    this.marque = vehiculeServeur.marque;
    this.modele = vehiculeServeur.modele;
    this.categorie = vehiculeServeur.categorie;
    this.disponibilite = vehiculeServeur.disponibilite;
    this.statut = vehiculeServeur.statut;
    this.photoUrl = vehiculeServeur.photoUrl;
  }

}

import CovoitAnnonceServer from '../list-reservation-covoiturages/models/CovoitAnnonceServer.model';

export class Annonce {
  id?: number;
  dateDepart: Date;
  dateArrivee: Date;
  lieuDepart: string;
  lieuDestination: string;
  dureeTrajet: number;
  distance: number;
  immatriculation: string;
  marque: string;
  modele: string;
  nbPlace: number;
  nbVoyageurs?: number;
  statut: string;

  constructor(annonceServeur: CovoitAnnonceServer) {
    this.id = annonceServeur.id;
    this.dateDepart = new Date(annonceServeur.itineraire.dateDepart);
    this.dateArrivee = new Date(annonceServeur.itineraire.dateArrivee);
    this.lieuDepart = annonceServeur.itineraire.lieuDepart;
    this.lieuDestination = annonceServeur.itineraire.lieuDestination;
    this.dureeTrajet = annonceServeur.itineraire.dureeTrajet;
    this.distance = annonceServeur.itineraire.distance;
    this.marque = annonceServeur.marque;
    this.modele = annonceServeur.modele;
    this.nbPlace = annonceServeur.nbPlace;
    this.nbVoyageurs = annonceServeur.listPassagers.length;
    this.statut = annonceServeur.statut;

  }
}

import CovoitAnnonceServer from '../list-reservation-covoiturages/models/CovoitAnnonceServer.model';

export class Annonce {
  dateDepart: Date;
  dateArrivee: Date;
  lieuDepart: string;
  lieuDestination: string;
  dureeTrajet: number;
  distance: number;
  responsable_id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  nbPlace: number;
  nbVoyageurs?: number;

  constructor(annonceServeur: CovoitAnnonceServer) {
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

  }
}

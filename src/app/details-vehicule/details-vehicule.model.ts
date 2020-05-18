
export interface ReservationVehiculeServeur {


  dateDepart: string;
  dateArrivee: string;


  responsable: {
    nom: string;
    prenom: string;
    email: string;
    numTelephone: string;
  };

  chauffeur: {
    nom: string;
    prenom: string;
    email: string;
    numTelephone: string;
  };

  statut: string;

  vehicule: {
    immatriculation: string;
    marque: string;
    modele: string;
    categorie: string;
    nbPlace: number;
    statut: string;
  };

  statutDemandeChauffeur: string;
}

export class ReservationVehicule {
  dateDepart: Date;
  dateArrivee: Date;
  immatriculation: string;
  marque: string;
  modele: string;
  statutDemandeChauffeur: string;
  nomResponsable: string;
  prenomResponsable: string;

  constructor(reservationServeur: ReservationVehiculeServeur) {
    this.dateDepart = new Date(reservationServeur.dateDepart);
    this.dateArrivee = new Date(reservationServeur.dateArrivee);
    this.immatriculation = reservationServeur.vehicule.immatriculation;
    this.marque = reservationServeur.vehicule.marque;
    this.modele = reservationServeur.vehicule.modele;
    this.prenomResponsable = reservationServeur.responsable.prenom;
    this.nomResponsable = reservationServeur.responsable.nom;


  }
}


import { ReservationServeur } from './reservationServeur.domains';

/**
 * Réservation d'un collègue utilisateur de l'application.
 */
export class Reservation {
  dateDepart: Date;
  dateArrivee: Date;
  immatriculation: string;
  marque: string;
  modele: string;
  statutDemandeChauffeur: string;
  nomChauffeur: string;
  prenomChauffeur: string;

  constructor(reservationServeur: ReservationServeur) {
    this.dateDepart = new Date(reservationServeur.dateDepart);
    this.dateArrivee = new Date(reservationServeur.dateArrivee);
    this.immatriculation = reservationServeur.vehicule.immatriculation;
    this.marque = reservationServeur.vehicule.marque;
    this.modele = reservationServeur.vehicule.modele;
    this.statutDemandeChauffeur = reservationServeur.statutDemandeChauffeur;

    if (reservationServeur.statutDemandeChauffeur === 'AVEC_CHAUFFEUR'){
      this.nomChauffeur = reservationServeur.chauffeur.nom;
      this.prenomChauffeur = reservationServeur.chauffeur.prenom;
    }
  }

}

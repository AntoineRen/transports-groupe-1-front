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

  constructor(reservationServeur: ReservationServeur) {
    this.dateDepart = new Date(reservationServeur.itineraire.dateDepart);
    this.dateArrivee = new Date(reservationServeur.itineraire.dateArrivee);
    this.immatriculation = reservationServeur.vehicule.immatriculation;
    this.marque = reservationServeur.vehicule.marque;
    this.modele = reservationServeur.vehicule.modele;
  }

}

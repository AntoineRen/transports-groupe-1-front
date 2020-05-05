/**
 * Réservation d'un collègue utilisateur de l'application.
 */
export class Reservation {
  dateDepart: Date;
  dateArrivee: Date;
  immatriculation: string;
  marque: string;
  modele: string;

  constructor(params: any) {
    Object.assign(this, params);
  }

}

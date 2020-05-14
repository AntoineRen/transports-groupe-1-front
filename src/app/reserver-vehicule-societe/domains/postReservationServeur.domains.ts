import { Periode } from './periode.domains';

export class PostReservationServeur {

  dateDepart: string;
  dateArrivee: string;
  vehiculeId: number;
  avecChauffeur: boolean;

  constructor(period: Periode, vehiculeId: number, avecChauffeur: boolean) {

    this.dateDepart = period.dateDepart;
    this.dateArrivee = period.dateRetour;
    this.vehiculeId = vehiculeId;
    this.avecChauffeur = avecChauffeur;
  }
}

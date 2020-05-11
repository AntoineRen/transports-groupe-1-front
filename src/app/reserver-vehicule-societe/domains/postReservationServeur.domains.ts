import { Periode } from './periode.domains';

export class PostReservationServeur {

  dateDepart: string;
  dateArrivee: string;
  vehiculeId: number;

  constructor(period: Periode, vehiculeId: number) {

    this.dateDepart = period.dateDepart;
    this.dateArrivee = period.dateRetour;
    this.vehiculeId = vehiculeId;
  }
}

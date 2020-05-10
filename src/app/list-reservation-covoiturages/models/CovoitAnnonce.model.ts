import CovoitAnnonceServer from './CovoitAnnonceServer.model';

export class CovoitAnnonce {
  dateDepart: Date;
  dateArrivee: Date;
  lieuDepart: string;
  lieuDestination: string;
  vehiculeMarque: string;
  vehiculeModel: string;
  chauffeurPrenom: string;
  chauffeurNom: string;


  constructor(annonceServeur: CovoitAnnonceServer) {
    this.dateDepart = new Date(annonceServeur.itineraire.dateDepart);
    this.dateArrivee = new Date(annonceServeur.itineraire.dateArrivee);
    this.lieuDepart = annonceServeur.itineraire.lieuDepart;
    this.lieuDestination = annonceServeur.itineraire.lieuDestination;
    this.vehiculeMarque = annonceServeur.marque;
    this.vehiculeModel = annonceServeur.modele;
    this.chauffeurNom = annonceServeur.responsable.nom;
    this.chauffeurPrenom = annonceServeur.responsable.prenom;

  }
}

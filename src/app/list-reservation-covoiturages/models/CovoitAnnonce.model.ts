import CovoitAnnonceServer from './CovoitAnnonceServer.model';

export class CovoitAnnonce {
  idAnnonce : number;
  dateDepart: Date;
  dateArrivee: Date;
  lieuDepart: string;
  lieuDestination: string;
  vehiculeMarque: string;
  vehiculeModel: string;
  chauffeurPrenom: string;
  chauffeurNom: string;
  emailChauffeur: string;
  nbPlace: number;

  constructor(annonceServeur: CovoitAnnonceServer) {
    this.idAnnonce = annonceServeur.id;
    this.dateDepart = new Date(annonceServeur.itineraire.dateDepart);
    this.dateArrivee = new Date(annonceServeur.itineraire.dateArrivee);
    this.lieuDepart = annonceServeur.itineraire.lieuDepart;
    this.lieuDestination = annonceServeur.itineraire.lieuDestination;
    this.vehiculeMarque = annonceServeur.marque;
    this.vehiculeModel = annonceServeur.modele;
    this.chauffeurNom = annonceServeur.responsable.nom;
    this.chauffeurPrenom = annonceServeur.responsable.prenom;
    this.nbPlace = annonceServeur.nbPlace;
    this.emailChauffeur = annonceServeur.responsable.email;
  }
}

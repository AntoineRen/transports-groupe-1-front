import { ChauffeurServeur } from './chauffeurServeur';

export class Chauffeur {

  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  permis: string;
  email: number;
  numTelephone: string;
  photoUrl: string;

  constructor(chauffeur: ChauffeurServeur){
      this.id = chauffeur.id;
      this.matricule = chauffeur.matricule;
      this.nom = chauffeur.nom;
      this.prenom = chauffeur.prenom;
      this.permis = chauffeur.permis;
      this.email = chauffeur.email;
      this.numTelephone = chauffeur.numTelephone;
      this.photoUrl = chauffeur.photoUrl;
  }
}

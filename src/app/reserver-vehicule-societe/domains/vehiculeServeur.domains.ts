/** Représente un objet véhicule renvoyé par le serveur */
export  interface VehiculeServeur {

  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  categorie: string;
  nbPlace: number;
  statut: string;
  photoUrl: string;

}

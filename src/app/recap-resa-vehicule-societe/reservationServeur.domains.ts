export interface ReservationServeur {

  itineraire: {
    dateDepart: string;
    dateArrivee: string;
    lieuDepart: string;
    lieuDestination: string;
  };

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

}

/** Représente un objet disponibilité renvoyé par le serveur pour connaitre la disponibilité d'un véhicule selon une période donnée */
export interface DisponibiliteVehicule {

  /** id du véhicule */
  id: number;
  /** disponibilité du vehicule */
  disponibilite: boolean;
}

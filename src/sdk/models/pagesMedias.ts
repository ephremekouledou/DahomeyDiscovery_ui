import { IDefault, MultiAppFile, WhoTypes } from "./models";
import { IVilleActivity } from "./villes";
import { v4 } from "uuid";

export interface IAcceuilCircuitCard extends IVilleActivity {
  category: string;
}

export const emptyIAcceuilCircuitCard = (): IAcceuilCircuitCard => ({
  image: [],
  name: "",
  description: "",
  category: "",
});

export interface IAcceuilComment {
  _id: string;
  name: string;
  lieu_origine: string;
  description: string;
}

export const emptyIAcceuilComment = (): IAcceuilComment => ({
  _id: "",
  name: "",
  lieu_origine: "",
  description: "",
});

export interface IRestaurantSettings {
  _id: string;
  type: string;
  image: MultiAppFile[];
  rotation: string;
}

export const emptyIRestaurantSettings = (): IRestaurantSettings => ({
  _id: v4(),
  type: "",
  image: [],
  rotation: "0",
});

export interface ITransferDestination {
  _id: string;
  nom: string;
  departement: string;
  distance: number;
}

export const emptyITransferDestination = (): ITransferDestination => ({
  _id: v4(),
  nom: "",
  departement: "",
  distance: 0,
});

export interface ITransferVehicule {
  _id: string;
  nom: string;
  price: number;
  capacity: string;
}

export const emptyITransferVehicule = (): ITransferVehicule => ({
  _id: v4(),
  nom: "",
  price: 0,
  capacity: "",
});

export interface IPageMedia extends IDefault {
  circuit_infos: IAcceuilCircuitCard[];
  avis: IAcceuilComment[];
  banniere: MultiAppFile[];
  acceuil_carrousel: MultiAppFile[];
  acceuil_image_fin: MultiAppFile[];
  signature_title: string;
  signature_subtitle: string;
  signature_reel: MultiAppFile[];
  signature_carrousel: MultiAppFile[];
  thematique_title: string;
  thematique_subtitle: string;
  thematique_reel: MultiAppFile[];
  thematique_carrousel: MultiAppFile[];
  carte_title: string;
  carte_subtitle: string;
  carte_reel: MultiAppFile[];
  hebergements_title: string;
  hebergements_subtitle: string;
  hebergements_background: MultiAppFile[];
  hebergements_catalogue: MultiAppFile[];
  hebergements_carrousel: MultiAppFile[];
  locations_background: MultiAppFile[];
  locations_background_tourisme: MultiAppFile[];
  locations_background_suv: MultiAppFile[];
  locations_background_van: MultiAppFile[];
  locations_carrousel: MultiAppFile[];
  a_propos_general_carrousel: MultiAppFile[];
  restaurant_title: string;
  restaurant_subtitle: string;
  restaurant_description: string;
  restaurants: IRestaurantSettings[];
  restaurant_catalogue: MultiAppFile[];
  attractions_title: string;
  attractions_subtitle: string;
  attraction_background: MultiAppFile[];
  transfert_title: string;
  transfert_subtitle: string;
  transfert_background: MultiAppFile[];
  transfer_destinations: ITransferDestination[];
  transfer_vehicules: ITransferVehicule[];
}

export const emptyIPageMedia = (): IPageMedia => ({
  // Propriétés héritées de IDefault (supposées)
  _id: "",
  created_at: new Date(),
  updated_at: new Date(),
  created_by: {
    id: "",
    type: WhoTypes.UnkownWhoType,
  },
  updated_by: {
    id: "",
    type: WhoTypes.UnkownWhoType,
  },
  not_delete: false,
  not_update: false,
  // Propriétés spécifiques à IPageMedia
  circuit_infos: [],
  avis: [],
  banniere: [],
  acceuil_carrousel: [],
  acceuil_image_fin: [],
  signature_title: "",
  signature_subtitle: "",
  signature_reel: [],
  signature_carrousel: [],
  thematique_title: "",
  thematique_subtitle: "",
  thematique_reel: [],
  thematique_carrousel: [],
  carte_title: "",
  carte_subtitle: "",
  carte_reel: [],
  hebergements_title: "",
  hebergements_subtitle: "",
  hebergements_background: [],
  hebergements_catalogue: [],
  hebergements_carrousel: [],
  locations_background: [],
  locations_background_tourisme: [],
  locations_background_suv: [],
  locations_background_van: [],
  locations_carrousel: [],
  a_propos_general_carrousel: [],
  restaurant_title: "",
  restaurant_subtitle: "",
  restaurant_description: "",
  restaurants: [],
  restaurant_catalogue: [],
  attractions_title: "",
  attractions_subtitle: "",
  attraction_background: [],
  transfert_title: "",
  transfert_subtitle: "",
  transfert_background: [],
  transfer_destinations: [],
  transfer_vehicules: [],
});

export interface IAddUpdatePageMedia {
  circuit_infos: IAcceuilCircuitCard[];
  avis: IAcceuilComment[];
  banniere: MultiAppFile[];
  acceuil_carrousel: MultiAppFile[];
  acceuil_image_fin: MultiAppFile[];
  signature_title: string;
  signature_subtitle: string;
  signature_reel: MultiAppFile[];
  signature_carrousel: MultiAppFile[];
  thematique_title: string;
  thematique_subtitle: string;
  thematique_reel: MultiAppFile[];
  thematique_carrousel: MultiAppFile[];
  carte_title: string;
  carte_subtitle: string;
  carte_reel: MultiAppFile[];
  hebergements_title: string;
  hebergements_subtitle: string;
  hebergements_background: MultiAppFile[];
  hebergements_catalogue: MultiAppFile[];
  hebergements_carrousel: MultiAppFile[];
  locations_background: MultiAppFile[];
  locations_background_tourisme: MultiAppFile[];
  locations_background_suv: MultiAppFile[];
  locations_background_van: MultiAppFile[];
  locations_carrousel: MultiAppFile[];
  a_propos_general_carrousel: MultiAppFile[];
  restaurant_title: string;
  restaurant_subtitle: string;
  restaurant_description: string;
  restaurants: IRestaurantSettings[];
  restaurant_catalogue: MultiAppFile[];
  attractions_title: string;
  attractions_subtitle: string;
  attraction_background: MultiAppFile[];
  transfert_title: string;
  transfert_subtitle: string;
  transfert_background: MultiAppFile[];
  transfer_destinations: ITransferDestination[];
  transfer_vehicules: ITransferVehicule[];
}

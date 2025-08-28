import { IDefault, MultiAppFile } from "./models";
import { IVilleActivity } from "./villes";

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
}

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
}

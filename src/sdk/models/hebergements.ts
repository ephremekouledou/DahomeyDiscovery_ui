import { IDefault, MultiAppFile, WhoTypes } from "./models";
import { v4 } from "uuid";

export interface IAmenity {
  name: string;
  icon: string;
  available: boolean;
  description?: string;
}

export type AmenitiesGroup = Record<string, IAmenity[]>;

// Interface pour les équipements d'hébergement
export interface IAccommodationEquipment {
  // Piscines
  piscine_exterieure: boolean;
  piscine_exterieure_badge?: string;
  piscine_interieure: boolean;
  piscine_interieure_badge?: string;
  piscine_toit: boolean;
  piscine_toit_badge?: string;
  piscine_debordement: boolean;
  piscine_debordement_badge?: string;
  piscine_vue: boolean;
  piscine_vue_badge?: string;
  piscine_enfants: boolean;
  piscine_enfants_badge?: string;

  // Bien-être
  bain_soleil: boolean;
  bain_soleil_badge?: string;
  spa: boolean;
  spa_badge?: string;
  sauna: boolean;
  sauna_badge?: string;
  source_chaude: boolean;
  source_chaude_badge?: string;
  salle_massage: boolean;
  salle_massage_badge?: string;
  salle_sport: boolean;
  salle_sport_badge?: string;
  randonnee: boolean;
  randonnee_badge?: string;

  // Transport & parking
  parking: boolean;
  parking_badge?: string;
  transfert_aeroport: boolean;
  transfert_aeroport_badge?: string;
  location_voiture: boolean;
  location_voiture_badge?: string;
  location_velos: boolean;
  location_velos_badge?: string;
  service_navette: boolean;
  service_navette_badge?: string;

  // Réception & services
  reception_24h: boolean;
  reception_24h_badge?: string;
  bagagerie: boolean;
  bagagerie_badge?: string;
  conciergerie: boolean;
  conciergerie_badge?: string;
  casiers: boolean;
  casiers_badge?: string;
  enregistrement_vip: boolean;
  enregistrement_vip_badge?: string;
  depart_express: boolean;
  depart_express_badge?: string;
  coffre_fort: boolean;
  coffre_fort_badge?: string;
  reservation_tours: boolean;
  reservation_tours_badge?: string;
  service_postal: boolean;
  service_postal_badge?: string;
  service_mariage: boolean;
  service_mariage_badge?: string;

  // Business
  centre_affaires: boolean;
  centre_affaires_badge?: string;
  salle_conference: boolean;
  salle_conference_badge?: string;
  salle_multifonction: boolean;
  salle_multifonction_badge?: string;
  wifi_public: boolean;
  wifi_public_badge?: string;

  // Espaces communs
  zone_fumeur: boolean;
  zone_fumeur_badge?: string;
  bar: boolean;
  bar_badge?: string;
  bar_lobby: boolean;
  bar_lobby_badge?: string;
  cafe: boolean;
  cafe_badge?: string;
  restaurant: boolean;
  restaurant_badge?: string;
  snack_bar: boolean;
  snack_bar_badge?: string;
  commerce: boolean;
  commerce_badge?: string;
  boite_nuit: boolean;
  boite_nuit_badge?: string;
  karaoke: boolean;
  karaoke_badge?: string;
  billard: boolean;
  billard_badge?: string;
  bbq: boolean;
  bbq_badge?: string;
  pique_nique: boolean;
  pique_nique_badge?: string;
  jardin: boolean;
  jardin_badge?: string;

  // Blanchisserie & entretien
  buanderie: boolean;
  buanderie_badge?: string;
  blanchisserie: boolean;
  blanchisserie_badge?: string;
  nettoyage_sec: boolean;
  nettoyage_sec_badge?: string;
  seche_linge: boolean;
  seche_linge_badge?: string;
  repassage: boolean;
  repassage_badge?: string;

  // Boutiques & services divers
  souvenirs: boolean;
  souvenirs_badge?: string;
  purificateur_eau: boolean;
  purificateur_eau_badge?: string;
  distributeur_billets: boolean;
  distributeur_billets_badge?: string;
  systeme_sonorisation: boolean;
  systeme_sonorisation_badge?: string;

  // Services en chambre
  service_chambre: boolean;
  service_chambre_badge?: string;
  repas_enfants: boolean;
  repas_enfants_badge?: string;
  club_enfants: boolean;
  club_enfants_badge?: string;
  garde_enfants: boolean;
  garde_enfants_badge?: string;

  // Langues
  francais: boolean;
  francais_badge?: string;
  anglais: boolean;
  anglais_badge?: string;
  espagnol: boolean;
  espagnol_badge?: string;

  // Accessibilité
  entree_sans_escalier: boolean;
  entree_sans_escalier_badge?: string;
  aide_ecoute: boolean;
  aide_ecoute_badge?: string;
}

// Interface pour les options d'hébergement
export interface IAccommodationOption {
  _id: string;
  name: string;
  description: string;
  photo: MultiAppFile[];
  price: number;
  size: string;
  bedType: string;
  maxGuests: string;
  childPolicy: string;
  additionalBeds: string;
  vue_sur: string;

  // Wi-Fi
  wifi: boolean;
  wifi_badge?: string;

  // Climatisation
  climatisation: boolean;
  climatisation_badge?: string;

  // Salle de bains privative
  salle_de_bain_privee: boolean;
  salle_de_bain_privee_badge?: string;

  // Réfrigérateur
  refrigerateur: boolean;
  refrigerateur_badge?: string;

  // Micro-ondes
  micro_ondes: boolean;
  micro_ondes_badge?: string;

  // Téléviseur
  tv: boolean;
  tv_badge?: string;

  // Minibar
  mini_bar: boolean;
  mini_bar_badge?: string;

  // Serviettes
  serviettes: boolean;
  serviettes_badge?: string;

  // Fenêtres
  fenetres: boolean;
  fenetres_badge?: string;

  // Lit
  lit: string;
  lit_badge?: string;

  // Surface et étage
  surface: string;
  surface_badge?: string;
  etage: string;
  etage_badge?: string;
}

export const emptyIAccommodationOption = (): IAccommodationOption => ({
  _id: v4(),
  name: "",
  description: "",
  photo: [],
  price: 0,
  size: "",
  bedType: "",
  maxGuests: "",
  childPolicy: "",
  additionalBeds: "",
  vue_sur: "",
  wifi: false,
  wifi_badge: "",
  climatisation: false,
  climatisation_badge: "",
  salle_de_bain_privee: false,
  salle_de_bain_privee_badge: "",
  refrigerateur: false,
  refrigerateur_badge: "",
  micro_ondes: false,
  micro_ondes_badge: "",
  tv: false,
  tv_badge: "",
  mini_bar: false,
  mini_bar_badge: "",
  serviettes: false,
  serviettes_badge: "",
  fenetres: false,
  fenetres_badge: "",
  lit: "",
  lit_badge: "",
  surface: "",
  surface_badge: "",
  etage: "",
  etage_badge: "",
});

// Interface principale pour les données d'hébergement
export interface IAccommodationData extends IDefault, IAccommodationEquipment {
  name: string;
  type: string;
  price?: number;
  rating: number;
  review_count: number;
  main_image: MultiAppFile[];
  images: MultiAppFile[];
  description: string;
  ville: string;
  amenities?: string;
  has_options: boolean;
  options?: IAccommodationOption[];
  owner: boolean;
  latitude: number;
  longitude: number;
  liked: boolean;
}

// Fonction helper pour créer un objet vide d'équipements
export const emptyIAccommodationEquipment = (): IAccommodationEquipment => ({
  // Piscines
  piscine_exterieure: false,
  piscine_exterieure_badge: "",
  piscine_interieure: false,
  piscine_interieure_badge: "",
  piscine_toit: false,
  piscine_toit_badge: "",
  piscine_debordement: false,
  piscine_debordement_badge: "",
  piscine_vue: false,
  piscine_vue_badge: "",
  piscine_enfants: false,
  piscine_enfants_badge: "",

  // Bien-être
  bain_soleil: false,
  bain_soleil_badge: "",
  spa: false,
  spa_badge: "",
  sauna: false,
  sauna_badge: "",
  source_chaude: false,
  source_chaude_badge: "",
  salle_massage: false,
  salle_massage_badge: "",
  salle_sport: false,
  salle_sport_badge: "",
  randonnee: false,
  randonnee_badge: "",

  // Transport & parking
  parking: false,
  parking_badge: "",
  transfert_aeroport: false,
  transfert_aeroport_badge: "",
  location_voiture: false,
  location_voiture_badge: "",
  location_velos: false,
  location_velos_badge: "",
  service_navette: false,
  service_navette_badge: "",

  // Réception & services
  reception_24h: false,
  reception_24h_badge: "",
  bagagerie: false,
  bagagerie_badge: "",
  conciergerie: false,
  conciergerie_badge: "",
  casiers: false,
  casiers_badge: "",
  enregistrement_vip: false,
  enregistrement_vip_badge: "",
  depart_express: false,
  depart_express_badge: "",
  coffre_fort: false,
  coffre_fort_badge: "",
  reservation_tours: false,
  reservation_tours_badge: "",
  service_postal: false,
  service_postal_badge: "",
  service_mariage: false,
  service_mariage_badge: "",

  // Business
  centre_affaires: false,
  centre_affaires_badge: "",
  salle_conference: false,
  salle_conference_badge: "",
  salle_multifonction: false,
  salle_multifonction_badge: "",
  wifi_public: false,
  wifi_public_badge: "",

  // Espaces communs
  zone_fumeur: false,
  zone_fumeur_badge: "",
  bar: false,
  bar_badge: "",
  bar_lobby: false,
  bar_lobby_badge: "",
  cafe: false,
  cafe_badge: "",
  restaurant: false,
  restaurant_badge: "",
  snack_bar: false,
  snack_bar_badge: "",
  commerce: false,
  commerce_badge: "",
  boite_nuit: false,
  boite_nuit_badge: "",
  karaoke: false,
  karaoke_badge: "",
  billard: false,
  billard_badge: "",
  bbq: false,
  bbq_badge: "",
  pique_nique: false,
  pique_nique_badge: "",
  jardin: false,
  jardin_badge: "",

  // Blanchisserie & entretien
  buanderie: false,
  buanderie_badge: "",
  blanchisserie: false,
  blanchisserie_badge: "",
  nettoyage_sec: false,
  nettoyage_sec_badge: "",
  seche_linge: false,
  seche_linge_badge: "",
  repassage: false,
  repassage_badge: "",

  // Boutiques & services divers
  souvenirs: false,
  souvenirs_badge: "",
  purificateur_eau: false,
  purificateur_eau_badge: "",
  distributeur_billets: false,
  distributeur_billets_badge: "",
  systeme_sonorisation: false,
  systeme_sonorisation_badge: "",

  // Services en chambre
  service_chambre: false,
  service_chambre_badge: "",
  repas_enfants: false,
  repas_enfants_badge: "",
  club_enfants: false,
  club_enfants_badge: "",
  garde_enfants: false,
  garde_enfants_badge: "",

  // Langues
  francais: false,
  francais_badge: "",
  anglais: false,
  anglais_badge: "",
  espagnol: false,
  espagnol_badge: "",

  // Accessibilité
  entree_sans_escalier: false,
  entree_sans_escalier_badge: "",
  aide_ecoute: false,
  aide_ecoute_badge: "",
});

export const emptyIAccommodationData = (): IAccommodationData => ({
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
  name: "",
  type: "",
  price: 0,
  rating: 0,
  review_count: 0,
  main_image: [],
  images: [],
  description: "",
  ville: "",
  amenities: "",
  options: [],
  owner: false,
  latitude: 0,
  longitude: 0,
  has_options: false,
  liked: false,
  ...emptyIAccommodationEquipment(),
});

// Interface pour l'ajout/mise à jour d'hébergement
export interface IAddUpdateAccommodationData extends IAccommodationEquipment {
  name: string;
  type: string;
  price?: number;
  rating: number;
  review_count: number;
  main_image: MultiAppFile[];
  images: MultiAppFile[];
  description: string;
  ville: string;
  amenities?: string;
  has_options: boolean;
  options?: IAccommodationOption[];
  owner: boolean;
  latitude: number;
  longitude: number;
}

export const emptyIAccommodationForm = (): IAddUpdateAccommodationData => ({
  name: "",
  type: "",
  price: 0,
  rating: 0,
  review_count: 0,
  main_image: [],
  images: [],
  description: "",
  ville: "",
  amenities: "",
  options: [],
  owner: false,
  latitude: 0,
  longitude: 0,
  has_options: false,
  ...emptyIAccommodationEquipment(),
});

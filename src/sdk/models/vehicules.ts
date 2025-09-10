import { IDefault, MultiAppFile, WhoTypes } from "./models";
import { v4 } from "uuid";

export interface ICarEquipment {
  // Sécurité enfants
  siege_bebe: boolean;
  siege_bebe_badge: string;
  siege_enfant: boolean;
  siege_enfant_badge: string;
  rehausseur: boolean;
  rehausseur_badge: string;

  // Navigation & connectivité
  gps: boolean;
  gps_badge: string;
  wifi_portable: boolean;
  wifi_portable_badge: string;
  bluetooth: boolean;
  bluetooth_badge: string;

  // Confort & services
  conducteur_supplementaire: boolean;
  conducteur_supplementaire_badge: string;
  forfait_peage: boolean;
  forfait_peage_badge: string;
  coffre_toit: boolean;
  coffre_toit_badge: string;

  // Accessibilité
  equipement_mobilite_reduite: boolean;
  equipement_mobilite_reduite_badge: string;

  // Équipements obligatoires
  gilet_fluorescent: boolean;
  gilet_fluorescent_badge: string;
  triangle: boolean;
  triangle_badge: string;
  roue_secours: boolean;
  roue_secours_badge: string;
  kit_ampoules: boolean;
  kit_ampoules_badge: string;

  // Assurance
  cdw: boolean;
  cdw_badge: string;
}

export const emptyCarEquipment = (): ICarEquipment => ({
  // Sécurité enfants
  siege_bebe: false,
  siege_bebe_badge: "",
  siege_enfant: false,
  siege_enfant_badge: "",
  rehausseur: false,
  rehausseur_badge: "",

  // Navigation & connectivité
  gps: false,
  gps_badge: "",
  wifi_portable: false,
  wifi_portable_badge: "",
  bluetooth: false,
  bluetooth_badge: "",

  // Confort & services
  conducteur_supplementaire: false,
  conducteur_supplementaire_badge: "",
  forfait_peage: false,
  forfait_peage_badge: "",
  coffre_toit: false,
  coffre_toit_badge: "",

  // Accessibilité
  equipement_mobilite_reduite: false,
  equipement_mobilite_reduite_badge: "",

  // Équipements obligatoires
  gilet_fluorescent: false,
  gilet_fluorescent_badge: "",
  triangle: false,
  triangle_badge: "",
  roue_secours: false,
  roue_secours_badge: "",
  kit_ampoules: false,
  kit_ampoules_badge: "",

  // Assurance
  cdw: false,
  cdw_badge: "",
});

export interface ICarTarification {
  _id: string;
  from: number;
  to: number;
  price: number;
  price_driver: number;
  description: string;
}

export const emptyICarTarification = (): ICarTarification => ({
  _id: v4(),
  from: 0,
  to: 0,
  price: 0,
  price_driver: 0,
  description: "",
});

// CarRentalData représente les données d'une voiture de location
export interface ICarRentalData extends IDefault, ICarEquipment {
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
  rating: number;
  review_count: number;
  main_image: MultiAppFile[];
  images: MultiAppFile[];
  description: string;
  location: string;
  availability: boolean;
  passengers: number;
  luggage: number;
  transmission: string; // Manuel | Automatique
  fuel_type: string; // Essence | Diesel | Électrique | Hybride
  fuel_consumption?: string;
  doors: number;
  features: string;
  tarification: ICarTarification[];
}

export const emptyICarRentalData = (): ICarRentalData => ({
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
  brand: "",
  model: "",
  year: 0,
  category: "",
  price_per_day: 0,
  rating: 0,
  review_count: 0,
  main_image: [],
  images: [],
  description: "",
  location: "",
  availability: false,
  passengers: 0,
  luggage: 0,
  transmission: "",
  fuel_type: "",
  fuel_consumption: "",
  doors: 0,
  features: "",
  tarification: [],
  ...emptyCarEquipment(),
});

export interface IAddUpdateCarRentalData extends ICarEquipment {
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
  rating: number;
  review_count: number;
  main_image: MultiAppFile[];
  images: MultiAppFile[];
  description: string;
  location: string;
  availability: boolean;
  passengers: number;
  luggage: number;
  transmission: string; // Manuel | Automatique
  fuel_type: string; // Essence | Diesel | Électrique | Hybride
  fuel_consumption?: string;
  doors: number;
  features: string;
  tarification: ICarTarification[];
}

export const emptyIAddUpdateCarRentalData = (): IAddUpdateCarRentalData => ({
  name: "",
  brand: "",
  model: "",
  year: 0,
  category: "",
  price_per_day: 0,
  rating: 0,
  review_count: 0,
  main_image: [],
  images: [],
  description: "",
  location: "",
  availability: false,
  passengers: 0,
  luggage: 0,
  transmission: "",
  fuel_type: "",
  fuel_consumption: "",
  doors: 0,
  features: "",
  tarification: [],
  ...emptyCarEquipment(),
});


import { IDefault, MultiAppFile, WhoTypes } from "./models";

// CarRentalData représente les données d'une voiture de location
export interface ICarRentalData extends IDefault {
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
});

export interface IAddUpdateCarRentalData {
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
});

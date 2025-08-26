import { IDefault, MultiAppFile, WhoTypes } from "./models";

export interface IAmenity {
  name: string;
  icon: string;
  available: boolean;
  description?: string;
}

export type AmenitiesGroup = Record<string, IAmenity[]>;

export interface IAccommodationOption {
  name: string;
  description: string;
  photo: MultiAppFile[];
  price: number;
  amenities: string;
}

export const emptyIAccommodationOption = (): IAccommodationOption => ({
    name: "",
    description: "",
    photo: [],
    price: 0,
    amenities: "",
});

export interface IAccommodationData extends IDefault {
  name: string;
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
}

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
    has_options: false,
});

export interface IAddUpdateAccommodationData {
  name: string;
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
}

export const emptyIAccommodationForm = (): IAddUpdateAccommodationData => ({
  name: "",
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
  has_options: false,
});

import { InclusList } from "./circuits";
import { IDefault, WhoTypes, MultiAppFile } from "./models";
import { v4 } from "uuid";

export interface TimeSlot {
  _id: string;
  time: string;
}

export const emptyTimeSlot = (): TimeSlot => ({
  _id: v4(),
  time: "",
});

export interface IAttractionTarification {
  _id: string;
  price: number;
  title: string;
  description: string;
}

export const emptyAttractionTarification = (): IAttractionTarification => ({
  _id: v4(),
  price: 0,
  title: "",
  description: "",
});

export interface IAttraction extends IDefault {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: IAttractionTarification[];
  duration: string;
  groupSize: number;
  languages: string[];
  category: string;
  description: string;
  includes: InclusList[];
  notIncludes: InclusList[];
  meetingPoint: string;
  cancellation: string;
  images: MultiAppFile[];
  timeSlots: TimeSlot[];
  tag?: string;
  free: boolean;
  format: string;
}

export const emptyIAttraction = (): IAttraction => ({
  _id: v4(),
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
  title: "",
  location: "",
  rating: 0,
  reviewCount: 0,
  price: [],
  duration: "",
  groupSize: 0,
  languages: [],
  category: "",
  description: "",
  includes: [],
  notIncludes: [],
  meetingPoint: "",
  cancellation: "",
  images: [],
  timeSlots: [],
  tag: "",
  free: false,
  format: "",
});

export interface IAddUpdateAttraction {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: IAttractionTarification[];
  duration: string;
  groupSize: number;
  languages: string[];
  category: string;
  description: string;
  includes: InclusList[];
  notIncludes: InclusList[];
  meetingPoint: string;
  cancellation: string;
  images: MultiAppFile[];
  timeSlots: TimeSlot[];
  tag?: string;
  free: boolean;
  format: string;
}

export const emptyIAddUpdateAttraction = (): IAddUpdateAttraction => ({
  title: "",
  location: "",
  rating: 0,
  reviewCount: 0,
  price: [],
  duration: "",
  groupSize: 0,
  languages: [],
  category: "",
  description: "",
  includes: [],
  notIncludes: [],
  meetingPoint: "",
  cancellation: "",
  images: [],
  timeSlots: [],
  tag: "",
  free: false,
  format: "",
});

import { IAttraction } from "./attraction";
import { ICircuit } from "./circuits";
import { IAccommodationData } from "./hebergements";
import { IDefault } from "./models";
import { ICarRentalData } from "./vehicules";

export interface IClientHistory {
  _id: string;
  created_at: string; // time.Time en Go → string en ISO date
  type: string;
  lien: string;
  circuit?: ICircuit;
  accommodation?: IAccommodationData;
  car_rental?: ICarRentalData;
  attraction?: IAttraction;
}

export interface IAddUpdateClient {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  history: IClientHistory[];
}

export interface IClient extends IAddUpdateClient, IDefault {}

export interface IAddClientBody {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

import { IDefault } from "./models";

export interface IReservation extends IDefault {
  date: Date;
  customer: string;
  status: string;
  transaction_id: string;
  type: string;
  item: string;
  number: number;
  villes: string[];
  chauffeur?: boolean;
}

export interface IAddUpdateReservation {
  date: Date;
  customer: string;
  status: string;
  transaction_id: string;
  type: string;
  item: string;
  number: number;
  villes: string[];
  chauffeur?: boolean;
}

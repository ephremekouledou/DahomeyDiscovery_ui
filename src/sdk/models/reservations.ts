import { IDefault } from "./models";

export interface IReservation extends IDefault, IAddUpdateReservation {
}

export interface IAddUpdateReservation {
  panier_id: string;
  transaction_id: string;
  status: string;
}

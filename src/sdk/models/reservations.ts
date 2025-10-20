import { IDefault } from "./models";

export interface IReservationTransfertInfos {
  transfer_type: string;
  location: string;
  pick_up_date: Date;
  passenger_count: number;
  pick_up_time: string;
  vehicle_type: string;
  flight_number: string;
  phone_number: string;
}

export interface IReservation extends IDefault {
  date: Date;
  customer: string;
  status: string;
  transaction_id: string;
  type: string;
  item?: string;
  number?: number;
  villes?: string[];
  chauffeur?: boolean;
  transfert_infos?: IReservationTransfertInfos;
}

export interface IAddUpdateReservation {
  date: Date;
  customer: string;
  status: string;
  transaction_id: string;
  type: string;
  item?: string;
  number?: number;
  villes?: string[];
  chauffeur?: boolean;
  transfert_infos?: IReservationTransfertInfos;
}

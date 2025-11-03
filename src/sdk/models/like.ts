import { IDefault } from "./models";

export interface Like extends IDefault {
  customer_id: string;
  item_id: string;
}

export interface LikeBodyRequest {
  customer_id: string;
  item_id: string;
}

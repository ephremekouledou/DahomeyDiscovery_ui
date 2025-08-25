import { IDefault, MultiAppFile, WhoTypes } from "./models";

export interface IVilleActivity {
  image: MultiAppFile[];
  name: string;
  description: string;
}

export const emptyIVilleActivity = (): IVilleActivity => ({
  image: [],
  name: "",
  description: "",
});

export interface IVille extends IDefault {
  name: string;
  description: string;
  image: MultiAppFile[];
  activities: IVilleActivity[];
}

export const emptyIVille = (): IVille => ({
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
  description: "",
  image: [],
  activities: [],
});

export interface IAddUpdateVilleData {
  name: string;
  description: string;
  image: MultiAppFile[];
  activities: IVilleActivity[];
}

export const emptyIVilleForm = (): IAddUpdateVilleData => ({
  name: "",
  description: "",
  image: [],
  activities: [emptyIVilleActivity()],
});

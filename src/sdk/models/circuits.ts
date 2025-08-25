import { IDefault, MultiAppFile, WhoTypes } from "./models";

export interface IActivite {
    _id: string;
    attraction: string;
    DateDebut: Date;
    DateFin: Date;
}

export interface ICircuit extends IDefault {
    ville: string;
    nom: string;
    description: string;
    active: boolean;
    images: MultiAppFile[];
    activites: IActivite[];
    theme: string;
  }
  
  export const emptyICircuit = (): ICircuit => ({
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
    ville: "",
    nom: "",
    description: "",
    active: false,
    images: [],
    activites: [],
    theme: ""
  });

  export interface ICircuitForm {
    ville: string;
    nom: string;
    description: string;
    active: boolean;
    images: MultiAppFile[];
    activites: IActivite[];
    theme: string;
  }
  
  export const emptyICircuitForm = (): ICircuitForm => ({
    ville: "",
    nom: "",
    description: "",
    active: false,
    images: [],
    activites: [],
    theme: ""
  });
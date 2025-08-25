import { MultiAppFile } from "../../components/DataForm/DataMultiFile";
import { IDefault, WhoTypes } from "./models";

export interface IAttraction extends IDefault {
  nom: string;
  ville: string;
  description: string;
  active: boolean;
  images: MultiAppFile[];
  videos: MultiAppFile[];
}

export const emptyIAttraction = (): IAttraction => ({
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
  nom: "",
  ville: "",
  description: "",
  active: false,
  images: [],
  videos: [],
});

export interface IAttractionForm {
  nom: string;
  ville: string;
  description: string;
  active: boolean;
  images: MultiAppFile[];
  videos: MultiAppFile[];
}

export const emptyIAttractionForm = (): IAttractionForm => ({
  nom: "",
  ville: "",
  description: "",
  active: false,
  images: [],
  videos: [],
});

export interface IAttractionPresenter extends IDefault {
  nom: string;
  ville: string;
  description: string;
  active: boolean;
  images: string[];
  videos: string[];
}

export const emptyIAttractionPresenter = (): IAttractionPresenter => ({
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
  nom: "",
  ville: "",
  description: "",
  active: false,
  images: [],
  videos: [],
});

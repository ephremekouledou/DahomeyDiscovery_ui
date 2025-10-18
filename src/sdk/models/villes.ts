import { InclusList, ITimeline } from "./circuits";
import { IDefault, WhoTypes, MultiAppFile } from "./models";

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

export interface IVilleVehiculeTarification {
  _id: string;
  from: number;
  to: number;
  price: number;
}

export interface IVille extends IDefault {
  name: string;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  full_description: string;
  timeline: ITimeline[];
  inclus: InclusList[];
  exclus: InclusList[];
  price: number;
  price_supp: number;
  vehicule_tarification: IVilleVehiculeTarification[];
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
  video: [],
  full_description: "",
  timeline: [],
  inclus: [],
  exclus: [],
  price: 0,
  price_supp: 0,
  vehicule_tarification: [],
});

export interface IAddUpdateVilleData {
  name: string;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  full_description: string;
  timeline: ITimeline[];
  inclus: InclusList[];
  exclus: InclusList[];
  price: number;
  price_supp: number;
  vehicule_tarification: IVilleVehiculeTarification[];
}

export const emptyIVilleForm = (): IAddUpdateVilleData => ({
  name: "",
  description: "",
  image: [],
  video: [],
  full_description: "",
  timeline: [],
  inclus: [],
  exclus: [],
  price: 0,
  price_supp: 0,
  vehicule_tarification: [],
});

export interface JsonVilleStructure extends IDefault {
  name: string;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  full_description: string;
  timeline: {
    _id: string;
    times: {
      _id: string;
      hour: string;
      activity: string;
    }[];
    title: string;
    position: string;
    image: MultiAppFile[];
  }[];
  inclus: any[];
  exclus: any[];
  times: {
    _id: string;
    step: string;
    hour: string;
    activity: string;
  }[];
  price: number;
  price_supp: number;
  vehicule_tarification: IVilleVehiculeTarification[];
}

export function jsonVilleToIAddUpdateVilleData(
  json: JsonVilleStructure
): IAddUpdateVilleData {
  return {
    name: json.name,
    description: json.description,
    image: json.image,
    video: json.video,
    full_description: json.full_description,
    timeline: json.timeline.map((tl) => ({
      _id: tl._id,
      times: json.times
        .filter((times) => times.step === tl._id)
        .map((time) => ({
          _id: time._id,
          hour: time.hour,
          activity: time.activity,
        })),
      title: tl.title,
      position: tl.position,
      image: tl.image,
    })),
    inclus: json.inclus.map((inc) => ({
      _id: inc._id || "",
      title: inc.title || "",
    })),
    exclus: json.exclus.map((exc) => ({
      _id: exc._id || "",
      title: exc.title || "",
    })),
    price: json.price,
    price_supp: json.price_supp,
    vehicule_tarification: json.vehicule_tarification,
  };
}

export function iAddUpdateVilleDataToJsonVille(
  circuit: IVille
): JsonVilleStructure {
  return {
    _id: circuit._id,
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
    name: circuit.name,
    description: circuit.description,
    image: circuit.image.map((img) => ({
      id: img.id,
      file: img.file,
      name: img.name,
      contentType: img.contentType,
      size: img.size,
      date: img.date,
    })),
    video: circuit.video.map((img) => ({
      id: img.id,
      file: img.file,
      name: img.name,
      contentType: img.contentType,
      size: img.size,
      date: img.date,
    })),
    full_description: circuit.full_description,
    price: circuit.price,
    price_supp: circuit.price_supp,
    timeline: circuit.timeline.map((tl) => ({
      _id: tl._id,
      times: tl.times.map((time) => ({
        _id: time._id,
        hour: time.hour,
        activity: time.activity,
      })),
      title: tl.title,
      position: tl.position,
      image: tl.image.map((img) => ({
        id: img.id,
        file: img.file,
        name: img.name,
        contentType: img.contentType,
        size: img.size,
        date: img.date,
      })),
    })),
    inclus: circuit.inclus.map((inc) => ({
      _id: inc._id,
      title: inc.title,
    })),
    exclus: circuit.exclus.map((exc) => ({
      _id: exc._id,
      title: exc.title,
    })),
    times: (circuit?.timeline || [])
      .map((tl) =>
        (tl.times || []).map((times) => ({
          _id: times._id,
          step: tl._id,
          hour: times.hour,
          activity: times.activity,
        }))
      )
      .flat(), // Le champ times du JSON semble être séparé et pourrait nécessiter une logique particulière
    vehicule_tarification: circuit.vehicule_tarification,
  };
}

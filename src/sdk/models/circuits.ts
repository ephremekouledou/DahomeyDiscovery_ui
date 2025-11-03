import { IDefault, MultiAppFile, WhoTypes } from "./models";
import { v4 } from "uuid";

// Time interface
export interface ITime {
  _id: string;
  hour: string;
  activity: string;
}

export const emptyITime = (): ITime => ({
  _id: v4(),
  hour: "",
  activity: "",
});

// Timeline interface
export interface ITimeline {
  _id: string;
  times: ITime[];
  title: string;
  position: string;
  image: MultiAppFile[];
}

export const emptyITimeline = (): ITimeline => ({
  _id: v4(),
  times: [emptyITime()],
  title: "",
  position: "",
  image: [],
});

// InclusList interface for inclus/exclus items
export interface InclusList {
  _id: string;
  title: string;
}

export const emptyInclusList = (): InclusList => ({
  _id: v4(),
  title: "",
});

export interface ICircuitStop {
  _id: string;
  title: string;
  description: string;
  image: MultiAppFile[];
  latitude: number;
  longitude: number;
}

export const emptyICircuitStop = (): ICircuitStop => ({
  _id: v4(),
  title: "",
  description: "",
  image: [],
  latitude: 0,
  longitude: 0,
});

// Main Circuit interface (extends DefaultModel like Go's embedded struct)
export interface ICircuit extends IDefault {
  type: string;
  title: string;
  price: number;
  day: number;
  night: number;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  timeline: ITimeline[];
  inclus: InclusList[];
  exclus: InclusList[];
  stops: ICircuitStop[];
  liked: boolean;
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
  type: "",
  title: "",
  price: 0,
  day: 0,
  night: 0,
  description: "",
  image: [],
  video: [],
  timeline: [],
  inclus: [],
  exclus: [],
  stops: [],
  liked: false,
});

// AddUpdateCircuit interface (without DefaultModel fields)
export interface IAddUpdateCircuit {
  type: string;
  title: string;
  price: number;
  day: number;
  night: number;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  timeline: ITimeline[];
  inclus: InclusList[];
  exclus: InclusList[];
  stops: ICircuitStop[];
}

export const emptyIAddUpdateCircuit = (): IAddUpdateCircuit => ({
  type: "",
  title: "",
  price: 0,
  day: 0,
  night: 0,
  description: "",
  image: [],
  video: [],
  timeline: [],
  inclus: [],
  exclus: [],
  stops: [],
});

export interface ICircuitPresenter extends IDefault {
  type: string;
  title: string;
  price: number;
  day: number;
  night: number;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  liked: boolean;
}

export interface JsonCircuitStructure extends IDefault {
  type: string;
  title: string;
  price: number;
  day: number;
  night: number;
  description: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
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
  stops: ICircuitStop[];
  times: {
    _id: string;
    step: string;
    hour: string;
    activity: string;
  }[];
}

export function jsonToIAddUpdateCircuit(
  json: JsonCircuitStructure
): IAddUpdateCircuit {
  return {
    type: json.type,
    title: json.title,
    price: json.price,
    day: json.day,
    night: json.night,
    description: json.description,
    image: json.image,
    video: json.video,
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
    stops: json.stops,
  };
}

export function iAddUpdateCircuitToJson(
  circuit: ICircuit
): JsonCircuitStructure {
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
    type: circuit.type,
    title: circuit.title,
    price: circuit.price,
    day: circuit.day,
    night: circuit.night,
    description: circuit.description,
    image: circuit.image.map((img) => ({
      id: img.id,
      file: img.file,
      name: img.name,
      contentType: img.contentType,
      size: img.size,
      date: img.date,
    })),
    video: circuit.video.map((vid) => ({
      id: vid.id,
      file: vid.file,
      name: vid.name,
      contentType: vid.contentType,
      size: vid.size,
      date: vid.date,
    })),
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
    stops: circuit.stops,
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
  };
}

import { IDefault, MultiAppFile, WhoTypes } from "./models";

// Time interface
export interface ITime {
  _id: string;
  hour: string;
  activity: string;
}

export const emptyITime = (): ITime => ({
  _id: "",
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
  _id: "",
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
  _id: "",
  title: "",
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
}

import { IDefault, WhoTypes } from "./models";

export enum UserTypes {
  SuperAdmin = "super-admin",
  User = "user",
  Admin = "admin",
}

export const UserTypeLevels: Record<string, number> = {
  [UserTypes.SuperAdmin]: 3,
  [UserTypes.Admin]: 2,
  [UserTypes.User]: 1,
};

export interface IUser extends IDefault {
  reference: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  type: string;
  active: boolean;
  picture: string | File | null;
  sexe: string;
  personnel_id: string;
  category: string;
  code_operateur: string;
}

export const emptyIUser = (): IUser => ({
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
  reference: "",
  name: "",
  email: "",
  password: "",
  phone_number: "",
  type: "",
  active: false,
  picture: null,
  sexe: "",
  personnel_id: "",
  category: "",
  code_operateur: "",
});

export interface IAddUserBody {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  type: string;
  active: boolean;
  picture: string | File | null;
  sexe: string;
  personnel_id: string;
  category: string;
  code_operateur: string;
}

export const emptyIAddUserBody = (): IAddUserBody => ({
  name: "",
  email: "",
  password: "",
  phone_number: "",
  type: "user",
  active: false,
  picture: null,
  sexe: "",
  personnel_id: "",
  category: "",
  code_operateur: "",
});

export interface UserFirstLogin {
  first: boolean;
}

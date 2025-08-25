export enum WhoTypes {
  UserWhoType = "user",
  SystemWhoType = "system",
  UnkownWhoType = "unknown",
}

export interface IWho {
  id: string;
  type: WhoTypes;
}

export interface IDefault {
  _id: string;
  created_at: Date;
  updated_at: Date;
  created_by: IWho;
  updated_by: IWho;
  not_delete: boolean;
  not_update: boolean;
}

export interface IBase {
  _id: string;
  created_at: Date;
  updated_at: Date;
}

export function DataToRender(data: any[]): any[] {
  return data.map((item) => {
    return {
      key: item._id,
      ...item,
    };
  });
}

export type AppFile = File | string | null;

export interface MultiAppFile {
  id: string;
  file: AppFile;
  name: string;
  contentType: string;
  size: number;
  date: Date;
}
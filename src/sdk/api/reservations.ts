import { IAddUpdateReservation, IReservation } from "../models/reservations";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";

export class ReservationsAPI {
  static getBaseURL() {
    return "/reservations";
  }

  /**
   * GetByID returns a category by its id
   * @param id
   */
  static GetByID(id: string): Promise<IReservation> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IReservation = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Add adds a new category
   */
  static Add(data: IAddUpdateReservation): Promise<IReservation> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const responseData: IReservation = response.data;
          resolve(responseData);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Update updates a category
   * @param id
   */
  static Update(
    id: string,
    data: IAddUpdateReservation
  ): Promise<IReservation> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .put(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const responseData: IReservation = response.data;
          resolve(responseData);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

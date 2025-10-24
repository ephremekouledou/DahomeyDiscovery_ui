import { AddUpdatePanier, Panier, PanierPresenter } from "../models/panier";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";

export class PaniersAPI {
  static getBaseURL() {
    return `/paniers`;
  }

  /**
   * List returns all paniers (presenters)
   */
  static List(clientID: string): Promise<PanierPresenter> {
    const url = "/paniers/presenter/" + clientID;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: PanierPresenter = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * GetByID returns a panier by its id
   * @param id
   */
  static GetByID(id: string): Promise<Panier> {
    const url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: Panier = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * GetActuelCustomer returns a panier by its id
   * @param id
   */
  static GetActuelCustomer(id: string): Promise<Panier> {
    const url = this.getBaseURL() + "/current?customerID=" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: Panier = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * GetByID returns a panier by its id
   * @param id
   */
  static GetPresenter(id: string): Promise<PanierPresenter> {
    const url = this.getBaseURL() + "/" + id + "/presenter";
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: PanierPresenter = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Add creates a new panier
   */
  static Add(data: AddUpdatePanier, customer_id: string): Promise<Panier> {
    const url = this.getBaseURL();
    data.customer_id = customer_id;
    data.actuel = true;
    console.log("Data to send:", data);
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const responseData: Panier = response.data;
          resolve(responseData);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Delete deletes a panier
   * @param id
   */
  static Delete(id: string): Promise<Panier> {
    const url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: Panier = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

export default PaniersAPI;

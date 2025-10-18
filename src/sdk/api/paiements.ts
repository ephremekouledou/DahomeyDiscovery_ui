import { MonerooPaymentResponse, IPaiementRequest } from "../models/paiement";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";

export class PaiementAPI {
  static getBaseURL() {
    return "/payments/initialize";
  }

  /**
   * InitializePayment initializes a payment
   */
  static Initiate(data: IPaiementRequest): Promise<MonerooPaymentResponse> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const responseData: MonerooPaymentResponse = response.data;
          resolve(responseData);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

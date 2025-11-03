import { LikeBodyRequest } from "../models/like";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";

export class LikeAPI {
  static getBaseURL() {
    return "/like";
  }

  /**
   * ToggleLike toggles a like
   */
  static ToggleLike(data: LikeBodyRequest) {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

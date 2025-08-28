import { IPageMedia } from "../models/pagesMedias";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";

export class PageSettings {
  static getBaseURL() {
    return "/page-settings";
  }

  /**
   * Get returns all the villes
   */
  static List(): Promise<IPageMedia> {
    var url = this.getBaseURL();
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IPageMedia = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

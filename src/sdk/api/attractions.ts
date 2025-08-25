import {
    IAttraction,
    IAttractionForm,
    IAttractionPresenter,
  } from "../models/attractions";
  import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
//   import { FileAPI } from "./file";
  
  export class AttractionsAPI {
    static getBaseURL() {
      return "/attractions";
    }
  
    /**
     * Get returns all the categories
     */
    static List(): Promise<IAttractionPresenter[]> {
      var url = this.getBaseURL();
      return new Promise((resolve, reject) => {
        axiosSiteData
          .get(url, axiosSiteDataConfig)
          .then((response: any) => {
            const data: IAttractionPresenter[] = response.data;
            resolve(data);
          })
          .catch((err: any) => {
            reject(handleErr(err));
          });
      });
    }
  
    /**
     * GetByID returns a category by its id
     * @param id
     */
    static GetByID(id: string): Promise<IAttraction> {
      var url = this.getBaseURL() + "/" + id;
      return new Promise((resolve, reject) => {
        axiosSiteData
          .get(url, axiosSiteDataConfig)
          .then((response: any) => {
            const data: IAttraction = response.data;
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
    static Add(data: IAttractionForm): Promise<IAttraction> {
      var url = this.getBaseURL();
      return new Promise((resolve, reject) => {
        // we check if the image is a file
        // if (data.image instanceof File) {
        //   FileAPI.Upload(data.image, "categories", data.name)
        //     .then((id: string) => {
        //       data.image = id;
  
        //       axiosSiteData
        //         .post(url, data, axiosSiteDataConfig)
        //         .then((response: any) => {
        //           const data: IAttraction = response.data;
        //           resolve(data);
        //         })
        //         .catch((err: any) => {
        //           reject(handleErr(err));
        //         });
        //     })
        //     .catch((err: any) => {
        //       reject(handleErr(err));
        //     });
  
        //   return;
        // }
  
        // data.image = data.image === null ? "" : data.image;
        axiosSiteData
          .post(url, data, axiosSiteDataConfig)
          .then((response: any) => {
            const data: IAttraction = response.data;
            resolve(data);
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
    static Update(id: string, data: IAttractionForm): Promise<IAttraction> {
      var url = this.getBaseURL() + "/" + id;
      return new Promise((resolve, reject) => {
        // we check if the image is a file
        // if (data.image instanceof File) {
        //   FileAPI.Upload(data.image, "categories", data.name)
        //     .then((id: string) => {
        //       data.image = id;
  
        //       axiosSiteData
        //         .put(url, data, axiosSiteDataConfig)
        //         .then((response: any) => {
        //           const data: ICategory = response.data;
        //           resolve(data);
        //         })
        //         .catch((err: any) => {
        //           reject(handleErr(err));
        //         });
        //     })
        //     .catch((err: any) => {
        //       reject(handleErr(err));
        //     });
  
        //   return;
        // }
  
        // data.image = data.image === null ? "" : data.image;
        axiosSiteData
          .put(url, data, axiosSiteDataConfig)
          .then((response: any) => {
            const data: IAttraction = response.data;
            resolve(data);
          })
          .catch((err: any) => {
            reject(handleErr(err));
          });
      });
    }
  
    /**
     * Delete deletes a category
     * @param id
     */
    static Delete(id: string): Promise<IAttraction> {
      var url = this.getBaseURL() + "/" + id;
      return new Promise((resolve, reject) => {
        axiosSiteData
          .delete(url, axiosSiteDataConfig)
          .then((response: any) => {
            const data: IAttraction = response.data;
            resolve(data);
          })
          .catch((err: any) => {
            reject(handleErr(err));
          });
      });
    }
  }
  
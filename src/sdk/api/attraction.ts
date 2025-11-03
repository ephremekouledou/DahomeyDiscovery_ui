import { IAddUpdateAttraction, IAttraction } from "../models/attraction";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
import { FileAPI } from "./file";
//   import { FileAPI } from "./file";

export class AttractionsAPI {
  static getBaseURL() {
    return "/attractions";
  }

  /**
   * Get returns all the attractions
   */
  static List(customer_id: string): Promise<IAttraction[]> {
    var url = this.getBaseURL() + `?customerID=${customer_id}`;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IAttraction[] = response.data;
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
  static Add(data: IAddUpdateAttraction): Promise<IAttraction> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      let imagesPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.images.length > 0) {
        data.images.map((file, index) => {
          if (file.file instanceof File) {
            imagesPromises.push(
              FileAPI.Upload(file.file, "villes", file.name)
                .then((id: string) => {
                  data.images[index].file = id;
                })
                .catch((err: any) => {
                  throw handleErr(err);
                })
            );
          }
        });
      }

      // Attendre que tous les uploads soient terminés
      Promise.all([...imagesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.images.map((_, index) => {
            data.images[index].file =
              data.images[index].file === null ? "" : data.images[index].file;
          });

          // Envoi des données
          return axiosSiteData.post(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const responseData: IAttraction = response.data;
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
  static Update(id: string, data: IAddUpdateAttraction): Promise<IAttraction> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      let imagesPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.images.length > 0) {
        data.images.map((file, index) => {
          if (file.file instanceof File) {
            imagesPromises.push(
              FileAPI.Upload(file.file, "villes", file.name)
                .then((id: string) => {
                  data.images[index].file = id;
                })
                .catch((err: any) => {
                  throw handleErr(err);
                })
            );
          }
        });
      }

      // Attendre que tous les uploads soient terminés
      Promise.all([...imagesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.images.map((_, index) => {
            data.images[index].file =
              data.images[index].file === null ? "" : data.images[index].file;
          });

          // Envoi des données
          return axiosSiteData.put(url, data, axiosSiteDataConfig);
        })
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
   * Delete deletes a ville
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

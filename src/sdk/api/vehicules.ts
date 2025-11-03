import { ICarRentalData, IAddUpdateCarRentalData } from "../models/vehicules";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
import { FileAPI } from "./file";
//   import { FileAPI } from "./file";

export class VehiculesAPI {
  static getBaseURL() {
    return "/vehicules";
  }

  /**
   * Get returns all the vehicules
   */
  static List(customer_id: string): Promise<ICarRentalData[]> {
    var url = this.getBaseURL() + "?customerID=" + customer_id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICarRentalData[] = response.data;
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
  static GetByID(id: string): Promise<ICarRentalData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICarRentalData = response.data;
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
  static Add(data: IAddUpdateCarRentalData): Promise<ICarRentalData> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.main_image.length > 0) {
        data.main_image.map((file, index) => {
          if (file.file instanceof File) {
            mainImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.main_image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

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
      Promise.all([mainImagePromise, ...imagesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.main_image.map((_, index) => {
            data.main_image[index].file =
              data.main_image[index].file === null
                ? ""
                : data.main_image[index].file;
          });

          data.images.map((_, index) => {
            data.images[index].file =
              data.images[index].file === null ? "" : data.images[index].file;
          });

          // Envoi des données
          return axiosSiteData.post(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const responseData: ICarRentalData = response.data;
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
    data: IAddUpdateCarRentalData
  ): Promise<ICarRentalData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.main_image.length > 0) {
        data.main_image.map((file, index) => {
          if (file.file instanceof File) {
            mainImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.main_image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

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
      Promise.all([mainImagePromise, ...imagesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.main_image.map((_, index) => {
            data.main_image[index].file =
              data.main_image[index].file === null
                ? ""
                : data.main_image[index].file;
          });

          data.images.map((_, index) => {
            data.images[index].file =
              data.images[index].file === null ? "" : data.images[index].file;
          });

          // Envoi des données
          return axiosSiteData.put(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const data: ICarRentalData = response.data;
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
  static Delete(id: string): Promise<ICarRentalData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICarRentalData = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

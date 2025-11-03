import {
  IAccommodationData,
  IAddUpdateAccommodationData,
} from "../models/hebergements";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
import { FileAPI } from "./file";
//   import { FileAPI } from "./file";

export class HebergementsAPI {
  static getBaseURL() {
    return "/hebergements";
  }

  /**
   * Get returns all the hebergements
   */
  static List(customer_id: string): Promise<IAccommodationData[]> {
    var url = this.getBaseURL() + "?customerID=" + customer_id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IAccommodationData[] = response.data;
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
  static GetByID(id: string): Promise<IAccommodationData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IAccommodationData = response.data;
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
  static Add(data: IAddUpdateAccommodationData): Promise<IAccommodationData> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];
      let optionsPromises: Promise<void>[] = [];

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

      // if there are option the upload images
      if (data.options !== undefined) {
        data.options.forEach((option, index) => {
          option.photo.map((file, indexj) => {
            if (file.file instanceof File) {
              optionsPromises.push(
                FileAPI.Upload(file.file, "villes", file.name)
                  .then((id: string) => {
                    if (data.options !== undefined) {
                      data.options[index].photo[indexj].file = id;
                    }
                  })
                  .catch((err: any) => {
                    throw handleErr(err);
                  })
              );
            }
          });
        });
      }

      // Attendre que tous les uploads soient terminés
      Promise.all(
        [mainImagePromise, ...imagesPromises, ...optionsPromises].filter(
          Boolean
        )
      )
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

          if (data.options !== undefined) {
            data.options.forEach((option, index) => {
              option.photo.map((_, indexj) => {
                if (data.options !== undefined) {
                  data.options[index].photo[indexj].file =
                    data.options[index].photo[indexj].file === null
                      ? ""
                      : data.options[index].photo[indexj].file;
                }
              });
            });
          }

          // Envoi des données
          return axiosSiteData.post(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const responseData: IAccommodationData = response.data;
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
    data: IAddUpdateAccommodationData
  ): Promise<IAccommodationData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];
      let optionsPromises: Promise<void>[] = [];

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

      // if there are option the upload images
      if (data.options !== undefined) {
        data.options.forEach((option, index) => {
          option.photo.map((file, indexj) => {
            if (file.file instanceof File) {
              optionsPromises.push(
                FileAPI.Upload(file.file, "villes", file.name)
                  .then((id: string) => {
                    if (data.options !== undefined) {
                      data.options[index].photo[indexj].file = id;
                    }
                  })
                  .catch((err: any) => {
                    throw handleErr(err);
                  })
              );
            }
          });
        });
      }

      // Attendre que tous les uploads soient terminés
      Promise.all(
        [mainImagePromise, ...imagesPromises, ...optionsPromises].filter(
          Boolean
        )
      )
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

          if (data.options !== undefined) {
            data.options.forEach((option, index) => {
              option.photo.map((_, indexj) => {
                if (data.options !== undefined) {
                  data.options[index].photo[indexj].file =
                    data.options[index].photo[indexj].file === null
                      ? ""
                      : data.options[index].photo[indexj].file;
                }
              });
            });
          }

          // Envoi des données
          return axiosSiteData.put(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const data: IAccommodationData = response.data;
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
  static Delete(id: string): Promise<IAccommodationData> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IAccommodationData = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

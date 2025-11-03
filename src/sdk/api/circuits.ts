import {
  ICircuit,
  IAddUpdateCircuit,
  ICircuitPresenter,
} from "../models/circuits";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
import { FileAPI } from "./file";
//   import { FileAPI } from "./file";

export class CircuitsAPI {
  static getBaseURL() {
    return "/circuits";
  }

  /**
   * Get returns all the circuits
   */
  static List(customer_id: string): Promise<ICircuitPresenter[]> {
    var url = this.getBaseURL() + `?customerID=${customer_id}`;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICircuitPresenter[] = response.data;
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
  static GetByID(id: string): Promise<ICircuit> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICircuit = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  static GetSignature(): Promise<ICircuit> {
    var url = this.getBaseURL() + "/signature";
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICircuit = response.data;
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
  static Add(data: IAddUpdateCircuit): Promise<ICircuit> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];
      let optionsPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.image.length > 0) {
        data.image.map((file, index) => {
          if (file.file instanceof File) {
            mainImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

      if (data.video.length > 0) {
        data.video.map((file, index) => {
          if (file.file instanceof File) {
            imagesPromises.push(
              FileAPI.Upload(file.file, "villes", file.name)
                .then((id: string) => {
                  data.video[index].file = id;
                })
                .catch((err: any) => {
                  throw handleErr(err);
                })
            );
          }
        });
      }

      // if there are option the upload images
      if (data.timeline !== undefined) {
        data.timeline.forEach((option, index) => {
          option.image.map((file, indexj) => {
            if (file.file instanceof File) {
              optionsPromises.push(
                FileAPI.Upload(file.file, "villes", file.name)
                  .then((id: string) => {
                    if (data.timeline !== undefined) {
                      data.timeline[index].image[indexj].file = id;
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
          data.image.map((_, index) => {
            data.image[index].file =
              data.image[index].file === null ? "" : data.image[index].file;
          });

          data.video.map((_, index) => {
            data.video[index].file =
              data.video[index].file === null ? "" : data.video[index].file;
          });

          if (data.timeline !== undefined) {
            data.timeline.forEach((option, index) => {
              option.image.map((_, indexj) => {
                if (data.timeline !== undefined) {
                  data.timeline[index].image[indexj].file =
                    data.timeline[index].image[indexj].file === null
                      ? ""
                      : data.timeline[index].image[indexj].file;
                }
              });
            });
          }

          // Envoi des données
          return axiosSiteData.post(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const responseData: ICircuit = response.data;
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
  static Update(id: string, data: IAddUpdateCircuit): Promise<ICircuit> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      let mainImagePromise: Promise<void> | undefined;
      let imagesPromises: Promise<void>[] = [];
      let optionsPromises: Promise<void>[] = [];

      // Upload de l'image principale de l'hebergement'
      if (data.image.length > 0) {
        data.image.map((file, index) => {
          if (file.file instanceof File) {
            mainImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

      if (data.video.length > 0) {
        data.video.map((file, index) => {
          if (file.file instanceof File) {
            imagesPromises.push(
              FileAPI.Upload(file.file, "villes", file.name)
                .then((id: string) => {
                  data.video[index].file = id;
                })
                .catch((err: any) => {
                  throw handleErr(err);
                })
            );
          }
        });
      }

      // if there are option the upload images
      if (data.timeline !== undefined) {
        data.timeline.forEach((option, index) => {
          option.image.map((file, indexj) => {
            if (file.file instanceof File) {
              optionsPromises.push(
                FileAPI.Upload(file.file, "villes", file.name)
                  .then((id: string) => {
                    if (data.timeline !== undefined) {
                      data.timeline[index].image[indexj].file = id;
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
          data.image.map((_, index) => {
            data.image[index].file =
              data.image[index].file === null ? "" : data.image[index].file;
          });

          data.video.map((_, index) => {
            data.video[index].file =
              data.video[index].file === null ? "" : data.video[index].file;
          });

          if (data.timeline !== undefined) {
            data.timeline.forEach((option, index) => {
              option.image.map((_, indexj) => {
                if (data.timeline !== undefined) {
                  data.timeline[index].image[indexj].file =
                    data.timeline[index].image[indexj].file === null
                      ? ""
                      : data.timeline[index].image[indexj].file;
                }
              });
            });
          }

          // Envoi des données
          return axiosSiteData.put(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const data: ICircuit = response.data;
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
  static Delete(id: string): Promise<ICircuit> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: ICircuit = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

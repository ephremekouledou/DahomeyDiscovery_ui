import { IVille, IAddUpdateVilleData } from "../models/villes";
import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api";
import { FileAPI } from "./file";
//   import { FileAPI } from "./file";

export class VillesAPI {
  static getBaseURL() {
    return "/villes";
  }

  /**
   * Get returns all the villes
   */
  static List(): Promise<IVille[]> {
    var url = this.getBaseURL();
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IVille[] = response.data;
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
  static GetByID(id: string): Promise<IVille> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IVille = response.data;
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
  static Add(data: IAddUpdateVilleData): Promise<IVille> {
    const url = this.getBaseURL();

    return new Promise((resolve, reject) => {
      let villeImagePromise: Promise<void> | undefined;
      let activitiesPromises: Promise<void>[] = [];

      // Upload de l'image principale de la ville
      if (data.image.length > 0) {
        data.image.map((file, index) => {
          if (file.file instanceof File) {
            villeImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

      data.activities.forEach((activity, index) => {
        activity.image.map((file, indexj) => {
          if (file.file instanceof File) {
            const activityPromise = (villeImagePromise = FileAPI.Upload(
              file.file,
              "villes",
              file.name
            )
              .then((id: string) => {
                data.activities[index].image[indexj].file = id;
                activitiesPromises.push(activityPromise);
              })
              .catch((err: any) => {
                throw handleErr(err);
              }));
          }
        });
      });

      // Attendre que tous les uploads soient terminés
      Promise.all([villeImagePromise, ...activitiesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.image.map((_, index) => {
            data.image[index].file =
              data.image[index].file === null ? "" : data.image[index].file;
          });

          data.activities.map((_, index) => {
            data.activities[index].image.map((_, indexj) => {
              data.activities[index].image[indexj].file =
                data.activities[index].image[indexj].file === null
                  ? ""
                  : data.activities[index].image[indexj].file;
            });
          });

          // Envoi des données
          return axiosSiteData.post(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const responseData: IVille = response.data;
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
  static Update(id: string, data: IAddUpdateVilleData): Promise<IVille> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      let villeImagePromise: Promise<void> | undefined;
      let activitiesPromises: Promise<void>[] = [];

      // Upload de l'image principale de la ville
      if (data.image.length > 0) {
        data.image.map((file, index) => {
          if (file.file instanceof File) {
            villeImagePromise = FileAPI.Upload(file.file, "villes", file.name)
              .then((id: string) => {
                data.image[index].file = id;
              })
              .catch((err: any) => {
                throw handleErr(err);
              });
          }
        });
      }

      data.activities.forEach((activity, index) => {
        activity.image.map((file, indexj) => {
          if (file.file instanceof File) {
            const activityPromise = (villeImagePromise = FileAPI.Upload(
              file.file,
              "villes",
              file.name
            )
              .then((id: string) => {
                data.activities[index].image[indexj].file = id;
                activitiesPromises.push(activityPromise);
              })
              .catch((err: any) => {
                throw handleErr(err);
              }));
          }
        });
      });

      // Attendre que tous les uploads soient terminés
      Promise.all([villeImagePromise, ...activitiesPromises].filter(Boolean))
        .then(() => {
          // Nettoyage des valeurs null
          data.image.map((_, index) => {
            data.image[index].file =
              data.image[index].file === null ? "" : data.image[index].file;
          });

          data.activities.map((_, index) => {
            data.activities[index].image.map((_, indexj) => {
              data.activities[index].image[indexj].file =
                data.activities[index].image[indexj].file === null
                  ? ""
                  : data.activities[index].image[indexj].file;
            });
          });

          // Envoi des données
          return axiosSiteData.put(url, data, axiosSiteDataConfig);
        })
        .then((response: any) => {
          const data: IVille = response.data;
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
  static Delete(id: string): Promise<IVille> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IVille = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

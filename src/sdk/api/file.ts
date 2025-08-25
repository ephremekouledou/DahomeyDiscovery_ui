import { axiosSiteData, axiosSiteDataConfig, handleErr } from "./api.ts";

export class FileAPI {
  static Download(collection: string, id: string): string {
    return (
      axiosSiteData.defaults.baseURL +
      "/download?collection=" +
      collection +
      "&id=" +
      id
    );
  }

  static Upload(file: File, collection: string, name: string): Promise<string> {
    var url = "/upload?collection=" + collection + "&name=" + name;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, file, axiosSiteDataConfig)
        .then((response: any) => {
          const data: string = response.data.result;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }
}

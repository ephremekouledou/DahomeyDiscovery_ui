import { IAddUserBody, IUser, UserFirstLogin } from "../models/User";
import {
  axiosSiteData,
  lsUserKey,
  lsUserTokenKey,
  axiosSiteDataConfig,
  handleErr,
} from "./api.ts";
import { FileAPI } from "./file";

export class UsersAPI {
  static getBaseURL() {
    return "/users";
  }

  /**
   * Access trylogging in teh user automatically with token
   */
  static Access(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get("/users/profile", axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * list returns all the organismes
   */
  static List(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get("/users", axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser[] = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * GetByID returns a product by its id
   * @param id
   */
  static GetByID(id: string): Promise<IUser> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  static Add(data: IAddUserBody): Promise<IUser> {
    var url = this.getBaseURL();
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Update updates a product
   * @param id
   * */
  static Update(id: string, data: IAddUserBody): Promise<IUser> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .put(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Delete deletes a product
   * @param id
   * */
  static Delete(id: string): Promise<IUser> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IUser = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * CheckFirstUser trylogging in teh user automatically with token
   */
  static CheckFirstUser(): Promise<UserFirstLogin> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get("/checkFirst", axiosSiteDataConfig)
        .then((response: any) => {
          const data: UserFirstLogin = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * Login logs in the user and returns the user token
   */
  static Login(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(
          "/login",
          { email: email, password: password },
          axiosSiteDataConfig
        )
        .then((response: any) => {
          // console.log("response", response.data)
          axiosSiteDataConfig.headers["Authorization"] = response.data.Token;
          axiosSiteDataConfig.headers["user-token"] = response.data.Token;
          localStorage.setItem(lsUserTokenKey, response.data.Token);
          localStorage.setItem(lsUserKey, JSON.stringify(response.data.User));
          resolve(response.data.Token);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * SignUp logs in the user and returns the user token
   */
  static SignUp(body: IAddUserBody): Promise<string> {
    return new Promise((resolve, reject) => {
      let imagePromise;

      if (body.picture instanceof File) {
        imagePromise = FileAPI.Upload(body.picture, "users", body.name)
          .then((id: string) => {
            body.picture = id;
          })
          .catch((err: any) => {
            throw handleErr(err);
          });
      }

      Promise.all([imagePromise])
        .then(() => {
          // Clean up null values
          body.picture = body.picture === null ? "" : body.picture;

          return axiosSiteData.post("/signUp", body, axiosSiteDataConfig);
        })
        .then((response: any) => {
          axiosSiteDataConfig.headers["Authorization"] = response.data.Token;
          localStorage.setItem(lsUserTokenKey, response.data.Token);
          localStorage.setItem(lsUserKey, JSON.stringify(response.data.User));
          resolve(response.data.Token);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  /**
   * GetUserFromToken returns the ouath user from the oauth access-token
   * @param token: string
   */
  static GetUserFromToken(token: string | null) {
    if (!token) {
      return undefined;
    }

    try {
      // We set axios token in axios config and in localstorage
      axiosSiteData.defaults.headers[lsUserTokenKey] = token;
      localStorage.setItem(lsUserTokenKey, token);
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   * GetToken returns the token from the localstorage
   * @returns string
   */
  static GetToken(): string {
    const token = localStorage.getItem(lsUserTokenKey);
    if (token) {
      axiosSiteData.defaults.headers[lsUserTokenKey] = token;
    }

    return token || "";
  }

  /**
   * GetUser returns the user from the localstorage
   * @returns IUser
   */
  static GetUser(): IUser | null {
    const user = localStorage.getItem(lsUserKey);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  /**
   * Logout removes the user data from the localstorage and redirects to the login page
   * @returns void
   */
  static Logout(): void {
    localStorage.removeItem(lsUserKey);
    localStorage.removeItem(lsUserTokenKey);
    window.location.href = "/login";
  }
}

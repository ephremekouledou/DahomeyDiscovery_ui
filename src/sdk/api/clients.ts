import {
  IAddClientBody,
  IAddUpdateClient,
  IClient,
  IClientHistory,
} from "../models/clients";
import {
  axiosSiteData,
  lsUserKey,
  lsUserTokenKey,
  axiosSiteDataConfig,
  handleErr,
  IsUserHistory,
} from "./api";

const MAX_HISTORY_SIZE = 5;

export class ClientsAPI {
  static getBaseURL() {
    return "/clients";
  }

  /**
   * Access trylogging in teh user automatically with token
   */
  static Access(): Promise<IClient> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get("/clients/profile", axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
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
  static List(): Promise<IClient[]> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get("/clients", axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient[] = response.data;
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
  static GetByID(id: string): Promise<IClient> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .get(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  static Add(data: IAddUpdateClient): Promise<IClient> {
    var url = this.getBaseURL();
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
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
  static Update(id: string, data: IAddUpdateClient): Promise<IClient> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .put(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
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
  static Delete(id: string): Promise<IClient> {
    var url = this.getBaseURL() + "/" + id;
    return new Promise((resolve, reject) => {
      axiosSiteData
        .delete(url, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
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
          "/customer-login",
          { email: email, password: password },
          axiosSiteDataConfig
        )
        .then((response: any) => {
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
  static SignUp(body: IAddClientBody): Promise<string> {
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post("/customer-signUp", body, axiosSiteDataConfig)
        .then((response: any) => {
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
      console.log(error);
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
  static GetUser(): IClient | null {
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

  static AddToClientHistory(data: IClientHistory): Promise<IClient> {
    var url = this.getBaseURL() + "/history";
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  static ListClientHistory(data: IClientHistory[]): Promise<IClient> {
    var url = this.getBaseURL() + "/history/get";
    return new Promise((resolve, reject) => {
      axiosSiteData
        .post(url, data, axiosSiteDataConfig)
        .then((response: any) => {
          const data: IClient = response.data;
          resolve(data);
        })
        .catch((err: any) => {
          reject(handleErr(err));
        });
    });
  }

  static GetClientHistoryLocal(): IClientHistory[] {
    // 🔄 récupérer l'historique existant ou [] par défaut
    const history = localStorage.getItem(IsUserHistory);
    const userHistory: IClientHistory[] = history ? JSON.parse(history) : [];

    return userHistory;
  }

  static AddToClientHistoryLocal(data: IClientHistory): void {
    // 🔄 récupérer l'historique existant ou [] par défaut
    const history = localStorage.getItem(IsUserHistory);
    const userHistory: IClientHistory[] = history ? JSON.parse(history) : [];

    // ➕ ajouter la nouvelle entrée avec ta fonction utilitaire
    const updatedHistory = addToHistory(userHistory, data);

    // 💾 sauvegarder dans localStorage
    localStorage.setItem(IsUserHistory, JSON.stringify(updatedHistory));
  }

  static ListClientHistoryLocal(): IClientHistory | null {
    const history = localStorage.getItem(IsUserHistory);
    if (history) {
      return JSON.parse(history);
    }

    return null;
  }
}

function addToHistory(
  history: IClientHistory[],
  entry: IClientHistory
): IClientHistory[] {
  // Vérifier si déjà présent
  if (history.some((h) => h._id === entry._id)) {
    return history; // on ne fait rien
  }

  if (history.length >= MAX_HISTORY_SIZE) {
    return [...history.slice(1), entry]; // supprime le premier et ajoute en fin
  } else {
    return [...history, entry]; // ajoute simplement
  }
}

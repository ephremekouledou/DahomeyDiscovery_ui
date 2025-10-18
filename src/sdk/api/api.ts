import axios from "axios";

export const axiosSiteData = axios.create();
export const apiBaseURL = "https://api.dahomeydiscovery.com/api/v1";
// export const apiBaseURL = "http://localhost:8080/api/v1";
axiosSiteData.defaults.baseURL = apiBaseURL;

export const fedaKey = "pk_sandbox_54Ed8w4N0dOVTST7OHwVWzHR"; // Public key
// export const fedaKey = "pk_live_5f3f4e7e1c3b4b8a9c8b4567"; // Live key

export const lsUserTokenKey = "Authorization";
export const lsUserKey = "user";
export const IsUserHistory = "history";

const token = localStorage.getItem(lsUserTokenKey);

export let axiosSiteDataConfig = {
  headers: {
    Authorization: token ? "bearer " + token : "",
    lang: "fr",
    "user-token": token ? token : "",
  },
};

export function setLang(lang: string) {
  axiosSiteDataConfig.headers.lang = lang;
}

export class ErrorResponse {
  status: number = 500;
  message: string = "";

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export function handleErr(err: any): ErrorResponse {
  if (!err || !err.response) {
    return new ErrorResponse(
      500,
      "Unable to reach the server. Please check your internet connection or contact the support."
    );
  }
  return new ErrorResponse(err.response.status, err.response.data.result);
}

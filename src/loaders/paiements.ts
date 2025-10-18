import { redirect } from "react-router-dom";
import { UsersAPI } from "../sdk/api/User";

export function paiementLoader(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!UsersAPI.GetToken()) {
      reject(redirect("/login"));
    }
    // We try getting the user data in local storage
    const localUser = UsersAPI.GetUser();
    if (localUser) {
      resolve(localUser);
    }

    // We try access the user data
    UsersAPI.Access()
      .then((user) => {
        return resolve({ user: user });
      })
      .catch((_) => {
        // console.log("User not logged in");
        reject(redirect("/login"));
      });
  });
}

import jwtDecode from "jwt-decode";
import setAxiosAuthToken from "./checkAxioAuth";

const checkIfUserIsAuth = () => {

  let getJwtToken = window.localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;
    let decodedToken = jwtDecode(getJwtToken);

    if (decodedToken.exp < currentTime) {
      setAxiosAuthToken(null);
      window.localStorage.removeItem("jwtToken");
      return null;
    }
    else {
      setAxiosAuthToken(getJwtToken);
      return decodedToken
    }
  }
  else {
    return null;
  }
}

export default checkIfUserIsAuth;
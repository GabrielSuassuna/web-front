import jwtDecode from "jwt-decode";
import { AUTH_LEVELS } from "./consts";

const tokenIsValid = (token) => {
  try {
    const { exp, iat } = jwtDecode(token || "");
    const now = Date.now().valueOf() / 1000;
    if (!exp || !iat) return false;

    if (now > exp) return false;

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const decodeToken = (token) => {
  try {
    const { id, userType, exp } = jwtDecode(token || "");
    return { id, userType, exp };
  } catch (e) {
    console.log(e);
    return { id: null, userType: null, exp: null };
  }
};

const getAuthData = (navigate) => {
  const token = localStorage.getItem("token");
  if(!token)
    return { token: null, id: null, userType: AUTH_LEVELS.GUEST, exp: null };
  if (!tokenIsValid(token)) {
    alert("Sessão expirada, por favor, refaça seu login.");
    navigate("/home");
    return { token: null, id: null, userType: null, exp: null };
  }
  return {
    token: token,
    ...decodeToken(token),
  };
};

const getAuthToken = (navigate) => {
  const token = localStorage.getItem("token");
  if(!token)
    return { token: null, id: null, userType: AUTH_LEVELS.GUEST, exp: null };
  if (!tokenIsValid(token)) {
    alert("Sessão expirada, por favor, refaça seu login.");
    navigate("/home");
    return;
  }
  return token;
};

export { tokenIsValid, decodeToken, getAuthToken, getAuthData };

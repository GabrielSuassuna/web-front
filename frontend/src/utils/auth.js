import jwtDecode from "jwt-decode";

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

export { tokenIsValid, decodeToken };

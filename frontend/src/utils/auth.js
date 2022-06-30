import jwtDecode from "jwt-decode";

const tokenIsValid = (token) => {
  const { exp, iat } = jwtDecode(token || "")
  const now = Date.now().valueOf() / 1000
  if (!exp || !iat)
    return false

  if (now > exp)
    return false

  return true
}

const decodeToken = (token) => {
  const { id, userType, exp } = jwtDecode(token || "")
  return { id, userType, exp }
}

export { tokenIsValid, decodeToken };
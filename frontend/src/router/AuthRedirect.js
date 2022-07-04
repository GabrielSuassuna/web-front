import { Navigate, useNavigate } from "react-router-dom";
import { tokenIsValid, decodeToken } from "../utils/auth";
import { apiRequest } from "../utils/apiReq";
import url from "../config/api";
import { AUTH_LEVELS } from "../utils/consts";

function AuthRedirect(props) {
  const token = localStorage.getItem("token");
  const { userType, id } = decodeToken(token);
  const navigate = useNavigate();

  if (!tokenIsValid(token) && props.levels.indexOf(AUTH_LEVELS.GUEST) === -1) {
    alert("Sessão expirada, por favor, refaça seu login.");
    return (
      <Navigate
        to={`/login${userType === AUTH_LEVELS.PROFESSOR ? "/professor" : ""}`}
        replace
      />
    );
  }

  if (!tokenIsValid(token) && props.levels.indexOf(AUTH_LEVELS.GUEST) !== -1)
    return props.children;

  if (
    props.levels.indexOf(AUTH_LEVELS.HEAD) !== -1 &&
    userType === AUTH_LEVELS.PROFESSOR
  ) {
    apiRequest(
      "GET",
      url + `/department/leader/${id}`,
      null,
      (res) => {
        if (res.data.length === 0) {
          alert(
            "Você não tem permissão para ver essa página. Contate a chefia de departamento ou a coordenação do curso."
          );
          navigate("/home");
        }
      },
      (res) => {
        alert(
          "Você não tem permissão para ver essa página. Contate a chefia de departamento ou a coordenação do curso."
        );
        navigate("/home");
      }
    );
    return props.children;
  }

  if (props.levels.length > 0 && props.levels.indexOf(userType) === -1)
    return <Navigate to="/home" replace />;

  return props.children;
}

export default AuthRedirect;

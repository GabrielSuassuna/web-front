import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { tokenIsValid, decodeToken } from "../../utils/auth";

function ProfessorLoginPage() {
  const navigate = useNavigate();
  const siapeRef = useRef(null);
  const passwordRef = useRef(null);

  const loginHandler = async () => {
    if (
      !validationStringChecker(siapeRef).isValid ||
      !validationStringChecker(passwordRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      code: siapeRef.current.value,
      password: passwordRef.current.value,
    };

    apiRequest(
      "POST",
      url + "/auth/professor",
      requestData,
      (res) => {
        if (!tokenIsValid(res.data[0])) {
          console.log(res);
          alert(res.message);
          return;
        }
        const { id, userType, exp } = decodeToken(res.data[0]);
        localStorage.setItem("token", res.data[0]);
        localStorage.setItem("userId", id);
        localStorage.setItem("userType", userType);
        localStorage.setItem("exp", exp);
        navigate("/");
      },
      (res) => {
        console.log(res);
        alert(res.message);
      }
    );
  };

  return (
    <div className="flex h-full flex-1 justify-center self-center w-64">
      <div className="flex flex-col items-center w-full">
        <img
          alt="logo"
          className="w-40 mb-10 mt-5"
          src={require("../../assets/img/logo.png")}
        />
        <ValidationInput
          hint="SIAPE"
          type="text"
          name="login"
          inputRef={siapeRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          showLabel={true}
          hint="Senha"
          type="password"
          name="answer"
          inputRef={passwordRef}
          validation={validationStringChecker}
        />
        <IconButton
          classes={[
            "w-full",
            "bg-indigo-700",
            "text-white",
            "py-2",
            "text-xs",
            "rounded",
            "mt-2",
          ]}
          content="ENTRAR"
          onClick={loginHandler}
        />
      </div>
    </div>
  );
}

export default ProfessorLoginPage;

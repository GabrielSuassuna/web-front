import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import url from "../../config/api";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";

function LoginPage() {
  const navigate = useNavigate();
  const registrationRef = useRef(null);
  const passwordRef = useRef(null);

  const loginHandler = async () => {
    if (
      !validationStringChecker(registrationRef).isValid ||
      !validationStringChecker(passwordRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      code: registrationRef.current.value,
      password: passwordRef.current.value,
    };

    apiRequest(
      "POST",
      url + "/auth/student",
      requestData,
      (response) => {
        localStorage.setItem("token", response.data[0]);
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
        <p>Login Estudante</p>
        <ValidationInput
          hint="Matrícula"
          type="text"
          name="login"
          inputRef={registrationRef}
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

export default LoginPage;

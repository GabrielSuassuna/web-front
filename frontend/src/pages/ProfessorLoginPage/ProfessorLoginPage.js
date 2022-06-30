import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";

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
        localStorage.setItem("token", res.data[0].token);
        localStorage.setItem("userType", res.data[0].user_type);
        localStorage.setItem("userId", res.data[0].user_id); 
        navigate("/")
      },
      (res) => {
        console.log(res);
        alert(res.message);
      }
    );
  };

  return (
    <div>
      <h1>ProfessorLoginPage</h1>
      <ValidationInput
        label="SIAPE"
        hint="ex: 123456"
        type="text"
        name="login"
        inputRef={siapeRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Senha"
        hint="*****"
        type="password"
        name="answer"
        inputRef={passwordRef}
        validation={validationStringChecker}
      />
      <IconButton content="Fazer Login" onClick={loginHandler} />
    </div>
  );
}

export default ProfessorLoginPage;

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
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
      password: passwordRef.current.value
    };
    
    apiRequest(
      'POST',
      'http://localhost:3000/auth/student',
      requestData,
      (_) => navigate('/'),
      (res) => {
        console.log(res)
        alert(res.message)
      }
    );
  }
  
  return (
    <div>
      <h1>LoginPage</h1>
      <ValidationInput
        label="Matrícula"
        hint="ex: 123456"
        type="text"
        name='login'
        inputRef={registrationRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Senha"
        hint="*****"
        type="password"
        name='answer'
        inputRef={passwordRef}
        validation={validationStringChecker}
      />
      <IconButton content="Fazer Login" onClick={loginHandler} />
    </div>
  );
}

export default LoginPage;

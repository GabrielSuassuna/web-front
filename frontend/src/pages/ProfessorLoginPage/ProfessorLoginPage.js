import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";


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
      password: passwordRef.current.value
    };

    apiRequest(
      'POST',
      'http://localhost:3000/auth/professor',
      requestData,
      (_) => navigate('/'),
      (res) => {
        console.log(res)
        alert(res.message)
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
        name='login'
        inputRef={siapeRef}
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

export default ProfessorLoginPage;

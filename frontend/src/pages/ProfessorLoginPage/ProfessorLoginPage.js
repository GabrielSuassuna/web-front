import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";


function ProfessorLoginPage() {
  const navigate = useNavigate();
  const registrationRef = useRef(null);
  const passwordRef = useRef(null);
  
  const validationStringChecker = (inputRef) => {
    if (
      inputRef &&
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.length >= 0
    ) {
      return { isValid: true };
    }
    return { isValid: false, message: "Esse campo não pode estar vazio" };
  };

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

    let response = await fetch('http://localhost:3000/auth/professor', {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(requestData) 
    })
    
    const res_data = await response.json();
    if(response.ok)
      navigate('/')
    else
      alert(res_data.message)
  };
  
  return (
    <div>
      <h1>ProfessorLoginPage</h1>
      <ValidationInput
        label="SIAPE"
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

export default ProfessorLoginPage;

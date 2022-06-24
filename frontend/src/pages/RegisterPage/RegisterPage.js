import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { post_request } from "../../utils/apiReq";

function RegisterPage() {

  const navigate = useNavigate();

  const studentNameRef = useRef(null);
  const studentIdRef = useRef(null);
  const studentPasswordRef = useRef(null);
  const studentPasswordConfirmRef = useRef(null);

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

  const validationPasswordChecker = (inputRef) => {
    if (
      inputRef &&
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.length >= 0
    ) {
      if (inputRef.current.value.length < 6)
        return {
          isValid: false,
          message: "Sua senha não pode ter menos de 6 caracteres",
        };
      return { isValid: true };
    }
    return { isValid: false, message: "Esse campo não pode estar vazio" };
  };

  const validationPasswordConfirmChecker = (inputRef) => {
    if (
      inputRef &&
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.length >= 0 &&
      inputRef.current.value === studentPasswordRef.current.value
    ) {
      return { isValid: true };
    }
    return { isValid: false, message: "As senhas não coincidem" };
  };

  const registerStudentHandler = async () => {
    if (
      !validationStringChecker(studentNameRef).isValid ||
      !validationStringChecker(studentIdRef).isValid ||
      !validationPasswordChecker(studentPasswordRef).isValid || 
      !validationPasswordConfirmChecker(studentPasswordConfirmRef).isValid
    )
      return alert("Dados inválidos!");
    
    let requestData = {
      registration: studentIdRef.current.value,
      name: studentNameRef.current.value,
      password: studentPasswordRef.current.value, // Algo precisa ser feito com essa senha
    };

    post_request(
      'http://localhost:3000/student/',
      requestData,
      (res) => {
        alert("Registro realizado!")
        console.log(res)
        navigate('/loggedHome')
      },
      (res) => {
        alert(res.message)
        console.log(res.message)
        console.log(res.errorStack)
      }
    );
  };

  return (
    <div>
      <h1>Fazer Registro</h1>

      <ValidationInput
        label="Nome Completo"
        hint="ex: Fulano de Tal Cicrano de Oliveira"
        type="text"
        name='name'
        inputRef={studentNameRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Matrícula"
        hint="ex: 414644"
        type="text"
        name='id'
        inputRef={studentIdRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Senha"
        hint="******"
        type="password"
        name='password'
        inputRef={studentPasswordRef}
        validation={validationPasswordChecker}
      />
      <ValidationInput
        label="Confirmar Senha"
        hint="******"
        type="password"
        name='confirm_password'
        inputRef={studentPasswordConfirmRef}
        validation={validationPasswordConfirmChecker}
      />

      <IconButton content="Registrar-se" onClick={registerStudentHandler} />
    </div>
  );
}

export default RegisterPage;

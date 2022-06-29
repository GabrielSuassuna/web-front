import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import {
  validationStringChecker,
  validationPasswordChecker,
  validationPasswordConfirmChecker,
} from "../../utils/validation";
import url from "../../config/api";

function RegisterPage() {
  const navigate = useNavigate();

  const studentNameRef = useRef(null);
  const studentIdRef = useRef(null);
  const studentPasswordRef = useRef(null);
  const studentPasswordConfirmRef = useRef(null);

  const registerStudentHandler = async () => {
    if (
      !validationStringChecker(studentNameRef).isValid ||
      !validationStringChecker(studentIdRef).isValid ||
      !validationPasswordChecker(studentPasswordRef).isValid ||
      !validationPasswordConfirmChecker(
        studentPasswordConfirmRef,
        studentPasswordRef
      ).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      registration: studentIdRef.current.value,
      name: studentNameRef.current.value,
      password: studentPasswordRef.current.value, // Algo precisa ser feito com essa senha
    };

    apiRequest(
      "POST",
      url + "/student/",
      requestData,
      (res) => {
        alert("Registro realizado!");
        console.log(res);
        navigate("/loggedHome");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      }
    );
  };

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-4xl font-bold mb-6">Cadastro de Aluno</h1>

      <div className="flex flex-col w-6/12">
        <ValidationInput
          label="Nome Completo"
          hint="ex: Fulano de Tal Cicrano de Oliveira"
          type="text"
          name="name"
          inputRef={studentNameRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="Matrícula"
          hint="ex: 414644"
          type="text"
          name="id"
          inputRef={studentIdRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="Senha"
          hint="******"
          type="password"
          name="password"
          inputRef={studentPasswordRef}
          validation={validationPasswordChecker}
        />
        <ValidationInput
          label="Confirmar Senha"
          hint="******"
          type="password"
          name="confirm_password"
          inputRef={studentPasswordConfirmRef}
          validation={validationPasswordConfirmChecker}
        />

        <IconButton
          classes={[
            "w-full",
            "bg-green-700",
            "text-white",
            "py-2",
            "text-xs",
            "rounded",
            "mt-2",
          ]}
          content="Registrar Aluno"
          onClick={registerStudentHandler}
        />
      </div>
    </div>
  );
}

export default RegisterPage;

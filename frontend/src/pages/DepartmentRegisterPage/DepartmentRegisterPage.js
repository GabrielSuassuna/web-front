import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import { apiRequest } from "../../utils/apiReq";
import styles from "./DepartmentRegisterPage.module.css";
import { validationStringChecker } from "../../utils/validation";

function DepartmentRegisterPage() {
  const navigate = useNavigate();

  const departmentNameRef = useRef(null);
  const departmentDescriptionRef = useRef(null);

  const registerFAQHandler = async () => {
    if (
      !validationStringChecker(departmentNameRef).isValid ||
      !validationStringChecker(departmentDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      name: departmentNameRef.current.value,
      description: departmentDescriptionRef.current.value,
    };

    apiRequest(
      'POST',
      "http://localhost:3000/department/",
      requestData,
      (res) => {
        alert("Registro de departamento realizado!");
        console.log(res);
        navigate("/faq");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      DUMMY_AUTH_TOKEN
    );
  };

  return (
    <div>
      <h1>Fazer Registro</h1>

      <ValidationInput
        label="Nome"
        hint="ex: Departamento de Computação"
        type="text"
        name="name"
        inputRef={departmentNameRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Descrição"
        hint="ex: O departamento de computação tem mais de ..."
        type="text"
        name="description"
        inputRef={departmentDescriptionRef}
        validation={validationStringChecker}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <IconButton content="Registrar Departamento" onClick={registerFAQHandler} />
    </div>
  );
}

export default DepartmentRegisterPage;

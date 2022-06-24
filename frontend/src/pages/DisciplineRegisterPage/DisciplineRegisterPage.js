import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import styles from "./DisciplineRegisterPage.module.css";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import { apiRequest } from "../../utils/apiReq";

function DisciplineRegisterPage() {
  const navigate = useNavigate();

  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);
  const disciplineDescriptionRef = useRef(null);

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

  const validationNumberChecker = (inputRef) => {
    if (inputRef && inputRef.current && inputRef.current.value) {
      if (Number.isNaN(inputRef.current.value) || inputRef.current.value <= 0)
        return { isValid: false, message: "Valor numérico inválido!" };
      return { isValid: true };
    }
    return { isValid: false, message: "Esse campo não pode estar vazio" };
  };

  const registerDisciplineHandler = () => {
    if (
      !validationStringChecker(disciplineNameRef).isValid ||
      !validationStringChecker(disciplineCodeRef).isValid ||
      !validationNumberChecker(disciplineHoursRef).isValid 
    )
      return alert("Dados inválidos!");
    
    let requestData = {
      name: disciplineNameRef.current.value,
      code: disciplineCodeRef.current.value,
      description: disciplineDescriptionRef.current.value || '',
      hours: disciplineHoursRef.current.value,
    };
    apiRequest(
      'POST',
      "http://localhost:3000/discipline/",
      requestData,
      (res) => {
        alert("Registro de disciplina realizado!");
        console.log(res);
        navigate("/");
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
      <h1>DisciplineRegisterPage</h1>
      <ValidationInput
        label="Nome da Disciplina"
        hint="ex: Algoritmos Aproximativos"
        type="text"
        inputRef={disciplineNameRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Código da Disciplina"
        hint="ex: CK0203"
        type="text"
        inputRef={disciplineCodeRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Descrição"
        hint="ex: Esta disciplina tem como foco..."
        type="text"
        name="description"
        inputRef={disciplineDescriptionRef}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <ValidationInput
        label="Carga horária da Disciplina"
        hint="ex: 96"
        type="number"
        inputRef={disciplineHoursRef}
        validation={validationNumberChecker}
      />

      
    <IconButton content="Registrar disciplina" onClick={registerDisciplineHandler} />
    </div>
  );
}

export default DisciplineRegisterPage;

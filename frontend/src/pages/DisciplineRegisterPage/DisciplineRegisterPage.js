import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";

function DisciplineRegisterPage() {
  const navigate = useNavigate();

  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);

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
      id: disciplineNameRef.current.ref,
      name: disciplineCodeRef.current.id,
      hours: disciplineHoursRef.current.id, // Algo precisa ser feito com essa senha
    };
    alert("Registro realizado!")
    console.log(requestData)
    navigate('/description/discipline')
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

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import {
  validationStringChecker,
  validationNumberChecker,
} from "../../utils/validation";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

function DisciplineRegisterPage() {
  const navigate = useNavigate();

  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);
  const disciplineDescriptionRef = useRef(null);

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
      description: disciplineDescriptionRef.current.value || "",
      hours: disciplineHoursRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "POST",
      url + "/discipline/",
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
      token
    );
  };

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-4xl font-bold mb-6">Cadastro de Disciplina</h1>

      <div className="flex flex-col w-6/12">
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
          inputClasses={[]}
          isTextArea
        />
        <ValidationInput
          label="Carga horária da Disciplina"
          hint="ex: 96"
          type="number"
          inputRef={disciplineHoursRef}
          validation={validationNumberChecker}
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
          content="Registrar disciplina"
          onClick={registerDisciplineHandler}
        />
      </div>
    </div>
  );
}

export default DisciplineRegisterPage;

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import {
  validationOptionalPasswordChecker,
  validationOptionalPasswordConfirmChecker,
  validationStringChecker,
} from "../../utils/validation";
import url from "../../config/api";
import { getAuthData, getAuthToken } from "../../utils/auth";

function ProfessorEditPage() {
  const navigate = useNavigate();

  const professorNameRef = useRef(null);
  const professorSiapeRef = useRef(null);
  const professorPasswordRef = useRef(null);
  const professorPasswordConfirmRef = useRef(null);
  const professorLattesUrlRef = useRef(null);
  const professorAboutRef = useRef(null);
  const [professorId, setProfessorId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);

  const { data: professor, error: professorError } = useSWR(
    `${url}/professor/${getAuthData(navigate).id}`,
    fetcher
  );

  checkForErrors([professorError]);

  useEffect(() => {
    if (professorId || !professor) {
      return;
    }
    console.log(professor)
    let professorData = professor.data[0];
    setProfessorId(professorData.id);
    setDepartmentId(professorData.department_id);
    professorNameRef.current.value = professorData.name;
    professorSiapeRef.current.value = professorData.siape;
    professorLattesUrlRef.current.value = professorData.lattes_url;
    professorAboutRef.current.value = professorData.about;
  }, [professor, professorId, navigate]);

  const editProfessor = async () => {
    if (
      !validationStringChecker(professorNameRef).isValid ||
      !validationStringChecker(professorSiapeRef).isValid ||
      !validationOptionalPasswordChecker(professorPasswordRef).isValid ||
      !validationOptionalPasswordConfirmChecker(
        professorPasswordConfirmRef,
        professorPasswordRef
      ).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      departmentId: departmentId,
      siape: professorSiapeRef.current.value,
      name: professorNameRef.current.value,
      about: professorAboutRef.current.value,
      lattesUrl: professorLattesUrlRef.current.value,
      password: professorPasswordRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/professor/${professorId}`,
      requestData,
      (res) => {
        alert("Edição de registro realizada!");
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
      <h1 className="text-4xl font-bold mb-6">
        Edição de Cadastro de Professor
      </h1>
      <div className="flex flex-col w-6/12">
        <ValidationInput
          label="Nome Completo"
          hint="ex: Fulano de Tal Cicrano de Oliveira"
          type="text"
          name="name"
          inputRef={professorNameRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="SIAPE"
          hint="ex: 414644"
          type="text"
          name="id"
          inputRef={professorSiapeRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="Nova Senha"
          hint="Deixe em branco se não deseja mudar sua senha"
          type="password"
          name="password"
          inputRef={professorPasswordRef}
        />
        <ValidationInput
          label="Confirmar Nova Senha"
          hint="Deixe em branco se não deseja mudar sua senha"
          type="password"
          name="confirm_password"
          inputRef={professorPasswordConfirmRef}
        />
        <div className="w-full mt-2">
          <ValidationInput
            label="Sobre"
            hint="ex: Sou um professor que preza por...."
            type="text"
            name="about"
            inputRef={professorAboutRef}
            inputClasses={[]}
            isTextArea
          />
        </div>
        <ValidationInput
          label="URL Lattes"
          hint="ex: lattes.cnpq.br/123456789"
          type="text"
          name="lattes"
          inputRef={professorLattesUrlRef}
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
          content="Editar Cadastro"
          onClick={editProfessor}
        />
      </div>
    </div>
  );
}

export default ProfessorEditPage;

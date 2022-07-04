import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import {
  validationStringChecker,
  validationPasswordChecker,
  validationPasswordConfirmChecker,
} from "../../utils/validation";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

function ProfessorRegisterPage() {
  const navigate = useNavigate();

  const professorNameRef = useRef(null);
  const professorIdRef = useRef(null);
  const professorPasswordRef = useRef(null);
  const professorPasswordConfirmRef = useRef(null);
  const professorLattesUrlRef = useRef(null);
  const professorAboutRef = useRef(null);

  const [professorDepartment, setProfessorDepartment] = useState(null);
  let [deptOptions, setDeptOptions] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const { data: departments, error: departmentsError } = useSWR(
    `${url}/department/`,
    fetcher
  );

  checkForErrors([departmentsError]);

  useEffect(() => {
    if (!departments || !departments.data || loaded) {
      return;
    }
    let deptOptions = departments.data.map((f) => {
      console.log(f);
      return {
        value: f.id,
        label: f.name,
      };
    });
    setDeptOptions(deptOptions);
    setLoaded(true);
  }, [deptOptions, departments, loaded]);

  const registerProfessorHandler = async () => {
    if (
      !validationStringChecker(professorNameRef).isValid ||
      !validationStringChecker(professorIdRef).isValid ||
      !validationPasswordChecker(professorPasswordRef).isValid ||
      !validationPasswordConfirmChecker(
        professorPasswordConfirmRef,
        professorPasswordRef
      ).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      departmentId: professorDepartment,
      siape: professorIdRef.current.value,
      name: professorNameRef.current.value,
      password: professorPasswordRef.current.value,
      about: professorAboutRef.current.value || "",
      lattesUrl: professorLattesUrlRef.current.value || "",
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "POST",
      url + "/professor/",
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
      },
      token
    );
  };

  return (
    <div className="mt-6 ml-6 pb-10">
      <h1 className="text-4xl font-bold mb-6">Cadastro de Docente</h1>

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
          inputRef={professorIdRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="Senha"
          hint="******"
          type="password"
          name="password"
          inputRef={professorPasswordRef}
          validation={validationPasswordChecker}
        />
        <ValidationInput
          label="Confirmar Senha"
          hint="******"
          type="password"
          name="confirm_password"
          inputRef={professorPasswordConfirmRef}
          validation={validationPasswordConfirmChecker}
        />
        <ValidationInput
          label="Sobre"
          hint="ex: Sou um professor que preza por...."
          type="text"
          name="about"
          inputRef={professorAboutRef}
          inputClasses={[]}
          isTextArea
        />
        <ValidationInput
          label="URL Lattes"
          hint="ex: lattes.cnpq.br/123456789"
          type="text"
          name="lattes"
          inputRef={professorLattesUrlRef}
        />
        <ValidationSelect
          name="dept"
          label="Departamento"
          hint="Selecione um departamento"
          value={professorDepartment}
          valueHandler={setProfessorDepartment}
          options={deptOptions}
        />

        <IconButton
          className={[
            "w-full",
            "bg-green-700",
            "text-white",
            "py-2",
            "text-xs",
            "rounded",
            "mt-2",
          ]}
          content="Registrar Docente"
          onClick={registerProfessorHandler}
        />
      </div>
    </div>
  );
}

export default ProfessorRegisterPage;

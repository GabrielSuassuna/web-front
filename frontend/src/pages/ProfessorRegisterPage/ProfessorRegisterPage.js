import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest } from "../../utils/apiReq";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import styles from "./ProfessorRegisterPage.module.css";

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
    `http://localhost:3000/department/`,
    fetcher
  );

  useEffect(()=>{
    if(!departments || !departments.data || loaded){
      return;
    }
    let deptOptions = departments.data.map((f) => {
      console.log(f)
      return {
        value: f.id,
        label: f.name
      };
    });
    setDeptOptions(deptOptions);
    setLoaded(true);
  },[deptOptions, departments, loaded]);

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
      inputRef.current.value === professorPasswordRef.current.value
    ) {
      return { isValid: true };
    }
    return { isValid: false, message: "As senhas não coincidem" };
  };

  const registerProfessorHandler = async () => {
    if (
      !validationStringChecker(professorNameRef).isValid ||
      !validationStringChecker(professorIdRef).isValid ||
      !validationPasswordChecker(professorPasswordRef).isValid || 
      !validationPasswordConfirmChecker(professorPasswordConfirmRef).isValid
    )
      return alert("Dados inválidos!");
    
    let requestData = {
      departmentId: professorDepartment,
      siape: professorIdRef.current.value,
      name: professorNameRef.current.value,
      password: professorPasswordRef.current.value,
      about: professorAboutRef.current.value || '' ,
      lattesUrl: professorLattesUrlRef.current.value || '' ,
    };

    apiRequest(
      'POST',
      'http://localhost:3000/professor/',
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
      },
      DUMMY_AUTH_TOKEN
    );
  };

  return (
    <div>
      <h1>Fazer Registro de Professor</h1>
      <ValidationInput
        label="Nome Completo"
        hint="ex: Fulano de Tal Cicrano de Oliveira"
        type="text"
        name='name'
        inputRef={professorNameRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="SIAPE"
        hint="ex: 414644"
        type="text"
        name='id'
        inputRef={professorIdRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Senha"
        hint="******"
        type="password"
        name='password'
        inputRef={professorPasswordRef}
        validation={validationPasswordChecker}
      />
      <ValidationInput
        label="Confirmar Senha"
        hint="******"
        type="password"
        name='confirm_password'
        inputRef={professorPasswordConfirmRef}
        validation={validationPasswordConfirmChecker}
      />
      <ValidationInput
        label="Sobre"
        hint="ex: Sou um professor que preza por...."
        type="text"
        name="about"
        inputRef={professorAboutRef}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <ValidationInput
        label="URL Lattes"
        hint="ex: lattes.cnpq.br/123456789"
        type="text"
        name='lattes'
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

      <IconButton content="Registrar-se" onClick={registerProfessorHandler} />
    </div>
  );
}

export default ProfessorRegisterPage;

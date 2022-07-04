import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import useSWR from "swr";
import fetcher, { auth_fetcher } from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import {
  validationOptionalPasswordChecker,
  validationOptionalPasswordConfirmChecker,
  validationStringChecker,
} from "../../utils/validation";
import url from "../../config/api";
import { getAuthData, getAuthToken } from "../../utils/auth";

function StudentEditPage() {
  const navigate = useNavigate();

  const studentNameRef = useRef(null);
  const studentRegistrationRef = useRef(null);
  const studentPasswordRef = useRef(null);
  const studentPasswordConfirmRef = useRef(null);
  const [studentId, setStudentId] = useState(null);

  const { data: student, error: studentError } = useSWR(
    `${url}/student/${getAuthData(navigate).id}`,
    auth_fetcher(getAuthToken(navigate))
  );

  checkForErrors([studentError]);

  useEffect(() => {
    if (studentId || !student) {
      return;
    }
    console.log(student);
    let studentData = student.data[0];
    setStudentId(studentData.id);
    studentNameRef.current.value = studentData.name;
    studentRegistrationRef.current.value = studentData.registration;
  }, [student, studentId, navigate]);

  const editStudent = async () => {
    if (
      !validationStringChecker(studentNameRef).isValid ||
      !validationStringChecker(studentRegistrationRef).isValid ||
      !validationOptionalPasswordChecker(studentPasswordRef).isValid ||
      !validationOptionalPasswordConfirmChecker(
        studentPasswordConfirmRef,
        studentPasswordRef
      ).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      registration: studentRegistrationRef.current.value,
      name: studentNameRef.current.value,
      password: studentPasswordRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/student/${studentId}`,
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
        Edição de Cadastro de Estudante
      </h1>
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
          inputRef={studentRegistrationRef}
          validation={validationStringChecker}
        />
        <ValidationInput
          label="Nova Senha"
          hint="Deixe em branco se não deseja mudar sua senha"
          type="password"
          name="password"
          inputRef={studentPasswordRef}
        />
        <ValidationInput
          label="Confirmar Nova Senha"
          hint="Deixe em branco se não deseja mudar sua senha"
          type="password"
          name="confirm_password"
          inputRef={studentPasswordConfirmRef}
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
          content="Editar Cadastro"
          onClick={editStudent}
        />
      </div>
    </div>
  );
}

export default StudentEditPage;

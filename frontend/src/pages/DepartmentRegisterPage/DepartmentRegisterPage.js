import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

function DepartmentRegisterPage() {
  const navigate = useNavigate();

  const departmentNameRef = useRef(null);
  const departmentDescriptionRef = useRef(null);

  const registerDepartmentHandler = async () => {
    if (
      !validationStringChecker(departmentNameRef).isValid ||
      !validationStringChecker(departmentDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      name: departmentNameRef.current.value,
      description: departmentDescriptionRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "POST",
      url + "/department/",
      requestData,
      (res) => {
        alert("Registro de departamento realizado!");
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
      <h1 className="text-4xl font-bold mb-6">Cadastro de Departamento</h1>

      <div className="flex flex-col w-6/12">
        <ValidationInput
          label="Nome"
          hint="ex: Departamento de Computação"
          type="text"
          name="name"
          inputRef={departmentNameRef}
          validation={validationStringChecker}
        />
        <div className="w-full mt-2">
          <ValidationInput
            label="Descrição"
            hint="ex: O departamento de computação tem mais de ..."
            type="text"
            name="description"
            inputRef={departmentDescriptionRef}
            validation={validationStringChecker}
            inputClasses={[]}
            isTextArea
          />
        </div>
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
          content="Registrar Departamento"
          onClick={registerDepartmentHandler}
        />
      </div>
    </div>
  );
}

export default DepartmentRegisterPage;

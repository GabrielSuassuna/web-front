import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { getAuthData, getAuthToken } from "../../utils/auth";
import { AUTH_LEVELS } from "../../utils/consts";

function DepartmentEditPage() {
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const departmentNameRef = useRef(null);
  const departmentDescriptionRef = useRef(null);
  const [courseCoordinator, setCourseCoordinator] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');

  let [deptOptions, setDeptOptions] = useState([]);
  let [deptOptionsLoaded, setDeptOptionsLoaded] = useState(false);

  const { data: departments, error: departmentsError } = useSWR(
    `${url}/department/`,
    fetcher
  );
  checkForErrors([departmentsError]);

  useEffect(() => {
    if (!departments || !departments.data || deptOptionsLoaded) {
      return;
    }

    let { id: userId, userType } = getAuthData(navigate);

    let optionsRawData = departments.data;

    if (userType !== AUTH_LEVELS.ADMIN)
      optionsRawData = optionsRawData.filter(
        (d) =>
          d.department_head_id === userId || d.course_coordinator_id === userId
      );

    let deptOptions = optionsRawData.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });

    setDeptOptions([
      {
        value: null,
        label: "Selecione um departamento",
      },
      ...deptOptions,
    ]);
    setDeptOptionsLoaded(true);
  }, [deptOptions, departments, deptOptionsLoaded, navigate]);

  const selectDepartmentHandler = (newDepartment) => {
    apiRequest(
      "GET",
      `${url}/department/${newDepartment}`,
      null,
      (res) => {
        let dptData = res.data[0];
        departmentNameRef.current.value = dptData.name;
        departmentDescriptionRef.current.value = dptData.description;
        setCourseCoordinator(`${dptData.course_coordinator_id}`);
        setDepartmentHead(`${dptData.department_head_id}`);
      },
      (res) => {
        console.log(res);
      }
    );
    if (!selectedDepartment)
      setDeptOptions([
        {
          value: null,
          label: "Selecione um departamento",
          disabled: true,
        },
        ...deptOptions.slice(1),
      ]);
    setSelectedDepartment(newDepartment);
  };

  const editDepartment = async () => {
    if (
      !validationStringChecker(departmentNameRef).isValid ||
      !validationStringChecker(departmentDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      name: departmentNameRef.current.value,
      description: departmentDescriptionRef.current.value,
      courseCoordinatorId: courseCoordinator,
      departmentHeadId: departmentHead,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/department/${selectedDepartment}`,
      requestData,
      (res) => {
        alert("Edição de departamento realizada!");
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
      <h1 className="text-4xl font-bold mb-6">Edição de Departamento</h1>

      <div className="flex flex-col w-6/12">
        <ValidationSelect
          name="dept"
          label="Departamento"
          hint="Selecione um departamento para editar"
          value={selectedDepartment}
          valueHandler={selectDepartmentHandler}
          options={deptOptions}
        />

        {selectedDepartment && (
          <>
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
              content="Editar Departamento"
              onClick={editDepartment}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DepartmentEditPage;

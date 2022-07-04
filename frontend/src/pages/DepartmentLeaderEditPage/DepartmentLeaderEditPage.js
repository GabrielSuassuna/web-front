import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import { getAuthData, getAuthToken } from "../../utils/auth";
import { AUTH_LEVELS } from "../../utils/consts";

function DepartmentLeaderEditPage() {
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [courseCoordinator, setCourseCoordinator] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");

  let [deptOptions, setDeptOptions] = useState([]);
  let [deptOptionsLoaded, setDeptOptionsLoaded] = useState(false);
  let [professorOptions, setProfessorOptions] = useState([]);
  let [professorOptionsLoaded, setProfessorOptionsLoaded] = useState(false);
  let [originalCoordinator, setOriginalCoordinator] = useState(null);
  let [originalHead, setOriginalHead] = useState(null);

  const { data: departments, error: departmentsError } = useSWR(
    `${url}/department/`,
    fetcher
  );

  const { data: professors, error: professorsError } = useSWR(
    `${url}/professor?departmentId=${selectedDepartment}`,
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

  useEffect(() => {
    if (!professors || !professors.data || professorOptionsLoaded) {
      return;
    }

    let optionsRawData = professors.data.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });

    setProfessorOptions([
      {
        value: null,
        label: "Selecione um professor",
      },
      ...optionsRawData,
    ]);
    setProfessorOptionsLoaded(true);
  }, [professorOptions, professors, professorOptionsLoaded, navigate]);

  const selectDepartmentHandler = (newDepartment) => {
    apiRequest(
      "GET",
      `${url}/department/${newDepartment}`,
      null,
      (res) => {
        let dptData = res.data[0];
        setCourseCoordinator(`${dptData.course_coordinator_id}`);
        setDepartmentHead(`${dptData.department_head_id}`);
        setOriginalCoordinator(`${dptData.course_coordinator_id}`);
        setOriginalHead(`${dptData.department_head_id}`);
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
    setProfessorOptionsLoaded(false);
  };

  const editLeaderHandler = async () => {
    if (originalCoordinator !== courseCoordinator)
      await editLeader(
        "changeCoordinator",
        courseCoordinator,
        "Edição de coordenador de curso realizada!"
      );
    if (originalHead !== departmentHead)
      await editLeader(
        "changeDepartmentHead",
        departmentHead,
        "Edição de chefe de departamento realizada!"
      );
    if (
      originalCoordinator !== courseCoordinator ||
      originalHead !== departmentHead
    )
      navigate("/");
  };

  const editLeader = async (route, value, message) => {
    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/department/${selectedDepartment}/${route}?professorId=${value}`,
      {},
      (res) => {
        alert(message);
        console.log(res);
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
        Mudança de Líderes de Departamento
      </h1>

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
            <ValidationSelect
              name="head"
              label="Chefe de Departamento"
              hint="Selecione um professor"
              value={departmentHead}
              valueHandler={setDepartmentHead}
              options={professorOptions}
            />
            <ValidationSelect
              name="coordinator"
              label="Coordenador de Curso"
              hint="Selecione um professor"
              value={courseCoordinator}
              valueHandler={setCourseCoordinator}
              options={professorOptions}
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
              disabled={
                originalCoordinator === courseCoordinator &&
                originalHead === departmentHead
              }
              content="Editar Líderes de departamento"
              onClick={editLeaderHandler}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DepartmentLeaderEditPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

function LecturingRegisterPage() {
  const navigate = useNavigate();

  let [professorOptions, setProfessorOptions] = useState([]);
  let [disciplineOptions, setDisciplineOptions] = useState([]);
  let [professorLoaded, setProfessorLoaded] = useState(false);
  let [disciplineLoaded, setDisciplineLoaded] = useState(false);

  const [professor, setProfessor] = useState(null);
  const [discipline, setDiscipline] = useState(null);

  const { data: professors, error: professorsError } = useSWR(
    `${url}/professor/`,
    fetcher
  );
  const { data: disciplines, error: disciplinesError } = useSWR(
    `${url}/discipline/`,
    fetcher
  );

  checkForErrors([professorsError, disciplinesError]);

  useEffect(() => {
    if (professors && professors.data && !professorLoaded) {
      let professorOptions = professors.data.map((f) => {
        return {
          value: f.id,
          label: `${f.siape} - ${f.name}`,
        };
      });
      setProfessorOptions(professorOptions);
      setProfessorLoaded(true);
    }
    if (disciplines && disciplines.data && !disciplineLoaded) {
      let disciplineOptions = disciplines.data.map((f) => {
        return {
          value: f.id,
          label: `${f.code} - ${f.name}`,
        };
      });
      setDisciplineOptions(disciplineOptions);
      setDisciplineLoaded(true);
    }
  }, [
    professorOptions,
    disciplineOptions,
    professors,
    disciplines,
    professorLoaded,
    disciplineLoaded,
  ]);

  const registerLecturingHandler = async () => {
    let requestData = {
      professorId: professor,
      disciplineId: discipline,
    };

    let token = getAuthToken(navigate);
    
    if(!token) return;

    apiRequest(
      "POST",
      url + "/lecturing/",
      requestData,
      (res) => {
        alert("Registro de disciplina ministrada realizado!");
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
        Cadastro de Disciplina Ministrada por Professor
      </h1>

      <div className="flex flex-col w-6/12">
        <ValidationSelect
          name="professor"
          label="Professor"
          hint="Selecione um professor"
          value={professor}
          valueHandler={setProfessor}
          options={professorOptions}
        />
        <ValidationSelect
          name="discipline"
          label="Discipline"
          hint="Selecione uma disciplina"
          value={discipline}
          valueHandler={setDiscipline}
          options={disciplineOptions}
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
            "mb-10",
          ]}
          content="Registrar-se"
          onClick={registerLecturingHandler}
        />
      </div>
    </div>
  );
}

export default LecturingRegisterPage;

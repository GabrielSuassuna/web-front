import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import url from "../../config/api";

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
        console.log(f);
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
        console.log(f);
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
      DUMMY_AUTH_TOKEN
    );
  };

  return (
    <div>
      <h1>Registrar disciplina ministrada por professor</h1>
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
      <IconButton content="Registrar-se" onClick={registerLecturingHandler} />
    </div>
  );
}

export default LecturingRegisterPage;

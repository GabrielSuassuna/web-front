import { useState, useRef, useEffect, useCallback } from "react";
import useSWR from "swr";
import IconButton from "../../components/IconButton/IconButton";
import SearchResult from "../../components/SearchResult/SearchResult";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import fetcher from "../../utils/fetcher";
import { checkForErrors } from "../../utils/apiReq";
import { SEARCH_RESULT_TYPES } from "../../utils/consts";
import URL from "../../config/api";

// const DUMMY_USER_TYPE = "STUDENT";
const DUMMY_USER_TYPE = "PROFESSOR";
const DUMMY_USER_ID = 10;

function MyFeedbacksPage() {
  const professorNameRef = useRef(null);
  const professorSiapeRef = useRef(null);
  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);
  const feedbackTitleRef = useRef(null);
  const feedbackPeriodRef = useRef(null);

  const [professorDepartment, setProfessorDepartment] = useState(null);
  const [deptOptions, setDeptOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { data: departments, error: departmentsError } = useSWR(
    `${URL}/department/`,
    fetcher
  );

  checkForErrors([departmentsError]);

  const checkRef = (ref) => {
    if(!ref || ref.current)
      return ref.current.value
    return '';
  }

  const handleSearch = (pageNumber) => {
    let url =
      URL +
      "/feedback" +
      (DUMMY_USER_TYPE === "STUDENT" ? "/student/" : "/professor/") +
      `${DUMMY_USER_ID}?`;
    url += `disciplineName=${checkRef(disciplineNameRef)}`;
    url += `&disciplineCode=${checkRef(disciplineCodeRef)}`;
    url += `&disciplineHours=${checkRef(disciplineHoursRef)}`;
    url += `&professorSiape=${checkRef(professorSiapeRef)}`;
    url += `&professorName=${checkRef(professorNameRef)}`;
    url += `&professorDepartmentId=${professorDepartment || ''}`;
    url += `&title=${checkRef(feedbackTitleRef)}`;
    url += `&period=${checkRef(feedbackPeriodRef)}`;
    url += `&page=${pageNumber}`;
    url += `&limit=10`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setResults(res.data);
      });
  };

  const handlePageChange = (change) => {
    handleSearch(change);
    setPageIndex(change);
  };

  useEffect(() => {
    if (!departments || !departments.data || loaded) {
      return;
    }
    let deptOptions = departments.data.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });
    setDeptOptions([
      { value: "", label: "Todos os departamentos" },
      ...deptOptions,
    ]);
    setProfessorDepartment("");
    setLoaded(true);
    handlePageChange(1);
  }, [deptOptions, departments, loaded]);

  return (
    <div>
      {showFilter && (
        <>
          <ValidationInput
            label="Nome do Professor"
            hint="ex: Fulano de Tal Cicrano de Oliveira"
            type="text"
            name="name"
            inputRef={professorNameRef}
          />
          <ValidationInput
            label="SIAPE do Professor"
            hint="ex: 12345"
            type="text"
            name="siape"
            inputRef={professorSiapeRef}
          />
          <ValidationSelect
            name="dept"
            label="Departamento"
            hint="Selecione um departamento"
            value={professorDepartment}
            valueHandler={setProfessorDepartment}
            options={deptOptions}
          />
          <ValidationInput
            label="Nome da Disciplina"
            hint="ex: Algoritmos Aproximativos"
            type="text"
            name="name"
            inputRef={disciplineNameRef}
          />
          <ValidationInput
            label="Código da Disciplina"
            hint="ex: CC0101"
            type="text"
            name="code"
            inputRef={disciplineCodeRef}
          />
          <ValidationInput
            label="Carga horária da Disciplina"
            hint="ex: 64"
            type="number"
            name="hours"
            inputRef={disciplineHoursRef}
          />
          <ValidationInput
            label="Título do Feedback"
            hint="ex: Ótimo profesor"
            type="text"
            name="title"
            inputRef={feedbackTitleRef}
          />
          <ValidationInput
            label="Período que cursou a disciplina"
            hint="ex: 2020.1"
            type="text"
            name="period"
            inputRef={feedbackPeriodRef}
          />
          <IconButton content="Pesquisar" onClick={() => handlePageChange(1)} />
        </>
      )}
      <hr/>
      <IconButton
        content={showFilter ? "Ocultar filtros" : "Filtrar feedbacks"}
        onClick={() => setShowFilter((showwing) => !showwing)}
      />
      {results.length > 0 && (
        <>
          <IconButton
            content="<"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
          />
          <h1>{pageIndex}</h1>
          <IconButton
            content=">"
            onClick={() => handlePageChange(pageIndex + 1)}
          />
        </>
      )}
      {results.map((result, i) => (
        <div key={i}>
          <SearchResult
            type={SEARCH_RESULT_TYPES.FEEDBACK}
            resultData={result}
          />{" "}
          <br />{" "}
        </div>
      ))}
    </div>
  );
}

export default MyFeedbacksPage;

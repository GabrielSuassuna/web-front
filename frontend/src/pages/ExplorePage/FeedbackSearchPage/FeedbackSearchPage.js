import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import IconButton from "../../../components/IconButton/IconButton";
import SearchResult from "../../../components/SearchResult/SearchResult";
import ValidationInput from "../../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../../components/ValidationSelect/ValidationSelect";
import fetcher from "../../../utils/fetcher";
import { checkForErrors } from "../../../utils/apiReq";
import { SEARCH_RESULT_TYPES } from "../../../utils/consts";

function FeedbackSearchPage() {
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

  const { data: departments, error: departmentsError } = useSWR(
    `http://localhost:3000/department/`,
    fetcher
  );

  checkForErrors([departmentsError]);

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
  }, [deptOptions, departments, loaded]);

  const handleSearch = (pageNumber) => {
    let url = "http://localhost:3000/feedback?";
    url += `disciplineName=${disciplineNameRef.current.value}`;
    url += `&disciplineCode=${disciplineCodeRef.current.value}`;
    url += `&disciplineHours=${disciplineHoursRef.current.value}`;
    url += `&professorSiape=${professorSiapeRef.current.value}`;
    url += `&professorName=${professorNameRef.current.value}`;
    url += `&professorDepartmentId=${professorDepartment}`;
    url += `&title=${feedbackTitleRef.current.value}`;
    url += `&period=${feedbackPeriodRef.current.value}`;
    url += `&page=${pageNumber}`;
    url += `&limit=10`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length === 0) {
          alert("Nenhum resultado encontrado");
        }
        setResults(res.data);
      });
  };

  const handlePageChange = (change) => {
    handleSearch(change);
    setPageIndex(change);
  };

  return (
    <div>
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

export default FeedbackSearchPage;

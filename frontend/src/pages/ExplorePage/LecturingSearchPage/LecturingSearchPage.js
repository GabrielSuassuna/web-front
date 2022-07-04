import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import IconButton from "../../../components/IconButton/IconButton";
import SearchResult from "../../../components/SearchResult/SearchResult";
import ValidationInput from "../../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../../components/ValidationSelect/ValidationSelect";
import fetcher from "../../../utils/fetcher";
import { checkForErrors } from "../../../utils/apiReq";
import { PAGE_LIMIT, SEARCH_RESULT_TYPES } from "../../../utils/consts";
import URL from "../../../config/api";

function LecturingSearchPage() {
  const professorNameRef = useRef(null);
  const professorSiapeRef = useRef(null);
  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);

  const [professorDepartment, setProfessorDepartment] = useState(null);
  const [deptOptions, setDeptOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { data: departments, error: departmentsError } = useSWR(
    `${URL}/department/`,
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
    let url = URL + "/lecturing?";
    url += `disciplineName=${disciplineNameRef.current.value}`;
    url += `&disciplineCode=${disciplineCodeRef.current.value}`;
    url += `&disciplineHours=${disciplineHoursRef.current.value}`;
    url += `&professorSiape=${professorSiapeRef.current.value}`;
    url += `&professorName=${professorNameRef.current.value}`;
    url += `&professorDepartmentId=${professorDepartment}`;
    url += `&page=${pageNumber}`;
    url += `&limit=${PAGE_LIMIT}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length === 0) {
          alert("Nenhum resultado encontrado");
        }
        setResults(res.data);
        setHasNextPage(res.message.split("last=")[1] === "FALSE");
      });
  };

  const handlePageChange = (change) => {
    handleSearch(change);
    setPageIndex(change);
  };

  return (
    <div className="flex flex-col">
      <div className="flex max-w-2xl mb-4">
        <ValidationInput
          label="Nome do Professor"
          hint="ex: Fulano de Tal Cicrano de Oliveira"
          type="text"
          name="name"
          inputRef={professorNameRef}
        />
      </div>
      <div className="flex max-w-2xl mb-4">
        <ValidationSelect
          name="dept"
          label="Departamento"
          hint="Selecione um departamento"
          value={professorDepartment}
          valueHandler={setProfessorDepartment}
          options={deptOptions}
        />
      </div>
      <div className="flex max-w-2xl mb-4">
        <ValidationInput
          label="SIAPE do Professor"
          hint="ex: 12345"
          type="text"
          name="siape"
          className={["mr-4"]}
          inputRef={professorSiapeRef}
        />
        <ValidationInput
          label="Nome da Disciplina"
          hint="ex: Algoritmos Aproximativos"
          type="text"
          name="name"
          inputRef={disciplineNameRef}
        />
      </div>
      <div className="flex max-w-2xl items-end mb-8">
        <ValidationInput
          label="Código da Disciplina"
          hint="ex: CC0101"
          type="text"
          name="code"
          className={["mr-4"]}
          inputRef={disciplineCodeRef}
        />
        <ValidationInput
          label="Carga horária da Disciplina"
          hint="ex: 64"
          type="number"
          name="hours"
          className={["mr-4"]}
          inputRef={disciplineHoursRef}
        />
        <div className="mb-1">
          <IconButton
            className={["p-1"]}
            content="Pesquisar"
            onClick={() => handlePageChange(1)}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        {results.map((result, i) => (
          <div key={i} className="mr-4">
            <SearchResult
              type={SEARCH_RESULT_TYPES.LECTURING}
              resultData={result}
            />{" "}
            <br />{" "}
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="flex items-center ml-auto">
          <IconButton
            content="<"
            className={["mr-4"]}
            disabled={pageIndex === 1}
            onClick={() => handlePageChange(pageIndex - 1)}
          />
          <h1 className="text-center">{pageIndex}</h1>
          <IconButton
            content=">"
            className={["ml-4"]}
            disabled={!hasNextPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          />
        </div>
      )}
    </div>
  );
}

export default LecturingSearchPage;

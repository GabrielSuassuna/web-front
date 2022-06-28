import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import IconButton from "../../../components/IconButton/IconButton";
import SearchResult from "../../../components/SearchResult/SearchResult";
import ValidationInput from "../../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../../components/ValidationSelect/ValidationSelect";
import fetcher from "../../../utils/fetcher";
import { checkForErrors } from "../../../utils/apiReq";
import { SEARCH_RESULT_TYPES } from "../../../utils/consts";

function ProfessorSearchPage(props) {
  const professorNameRef = useRef(null);
  const professorSiapeRef = useRef(null);

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
    setProfessorDepartment(deptOptions[0].value);
    setLoaded(true);
  }, [deptOptions, departments, loaded]);

  const handleSearch = (pageNumber) => {
    let url = "http://localhost:3000/professor?";
    url += `departmentId=${professorDepartment}`;
    url += `&name=${professorNameRef.current.value}`;
    url += `&siape=${professorSiapeRef.current.value}`;
    url += `&page=${pageNumber}`;
    url += `&limit=2`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
        name="name"
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
            type={SEARCH_RESULT_TYPES.PROFESSOR}
            resultData={result}
          />{" "}
          <br />{" "}
        </div>
      ))}
    </div>
  );
}

export default ProfessorSearchPage;
